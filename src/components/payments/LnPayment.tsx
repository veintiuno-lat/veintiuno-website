import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Zap, Copy, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNIP57 } from "@/hooks/use-nip57";
import { Separator } from "../ui/separator";

interface LnPaymentProps {
  lightningAddress: string;
  npub?: string;
}

const LnPayment: React.FC<LnPaymentProps> = ({ lightningAddress, npub }) => {
  const [step, setStep] = useState<
    "input" | "loading" | "waiting" | "success" | "error"
  >("input");
  const [amount, setAmount] = useState("21");
  const [invoice, setInvoice] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { handleZap, isLoading, signer } = useNIP57({
    communityNpub: npub || "",
    satsAmount: Number(amount),
    onPaymentSuccess: () => {
      setStep("success");
    },
    onPaymentError: (msg) => {
      setErrorMessage(msg);
      setStep("error");
    },
  });

  useEffect(() => {
    if (step !== "waiting" || !verifyUrl) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const pollingIntervalMs = 3000;
    const timeoutMs = 120000;
    const startTime = Date.now();

    const getUrlWithBypass = (url: string) => {
      try {
        const parsed = new URL(url);
        parsed.searchParams.set("t", Date.now().toString());
        return parsed.toString();
      } catch {
        const parsed = new URL(url, window.location.origin);
        parsed.searchParams.set("t", Date.now().toString());
        return parsed.toString();
      }
    };

    const poll = async () => {
      if (cancelled) {
        return;
      }

      if (Date.now() - startTime >= timeoutMs) {
        setErrorMessage(
          "El pago no se confirmó a tiempo. Cierra esta ventana y verifica tu wallet."
        );
        setStep("error");
        setVerifyUrl(null);
        return;
      }

      try {
        const response = await fetch(getUrlWithBypass(verifyUrl), {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Respuesta inválida del servidor de verificación.");
        }

        const data = await response.json();

        if (data?.settled === true) {
          setStep("success");
          setVerifyUrl(null);
          return;
        }
      } catch (error) {
        console.error("Error durante la verificación del pago:", error);
        setErrorMessage(
          "Hubo un problema al verificar el pago. Cierra esta ventana y revisa tu wallet."
        );
        setStep("error");
        setVerifyUrl(null);
        return;
      }

      timeoutId = setTimeout(poll, pollingIntervalMs);
    };

    poll();

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [step, verifyUrl]);

  const handleGenerateInvoice = async () => {
    if (!lightningAddress || !amount || Number(amount) <= 0) {
      setErrorMessage("Por favor, ingresa un monto válido.");
      setStep("error");
      return;
    }
    setStep("loading");
    setErrorMessage("");
    try {
      const [user, domain] = lightningAddress.split("@");
      if (!user || !domain) {
        throw new Error("Dirección Lightning inválida.");
      }

      const lnurlpRes = await fetch(
        `https://${domain}/.well-known/lnurlp/${user}`
      );
      if (!lnurlpRes.ok) {
        throw new Error("No se pudo contactar al proveedor.");
      }
      const lnurlpData = await lnurlpRes.json();
      if (lnurlpData.status === "ERROR") {
        throw new Error(lnurlpData.reason);
      }

      const amountInMillisats = Number(amount) * 1000;
      const callbackUrl = new URL(lnurlpData.callback);
      callbackUrl.searchParams.append("amount", amountInMillisats.toString());

      const invoiceRes = await fetch(callbackUrl.toString());
      if (!invoiceRes.ok) {
        throw new Error("No se pudo generar la factura.");
      }
      const invoiceData = await invoiceRes.json();
      if (invoiceData.status === "ERROR") {
        throw new Error(invoiceData.reason);
      }

      setInvoice(invoiceData.pr);
      setVerifyUrl(invoiceData.verify ?? null);

      setStep("waiting");
    } catch (error) {
      console.error("Error generando la factura:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Ocurrió un error desconocido."
      );
      setStep("error");
    }
  };

  const handleCopy = () => {
    if (invoice) {
      navigator.clipboard.writeText(invoice);
      alert("Factura copiada al portapapeles");
    }
  };

  const resetFlow = () => {
    setStep("input");
    setInvoice(null);
    setVerifyUrl(null);
    setErrorMessage("");
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetFlow()}>
      <DialogTrigger asChild>
        <button type='button' className='btn btn-sm btn-primary !text-ink-950'>
          Donar
          <Zap className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md w-[95vw] max-h-[90vh] flex flex-col rounded-3xl sm:rounded-3xl border-white/10 bg-ink-900 text-white shadow-[0_40px_120px_-30px_rgba(247,147,26,0.35)]'>
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle className='flex items-center gap-2 text-xl font-bold text-white'>
            <Zap className='h-5 w-5 text-bitcoin' />
            Donar con Lightning
          </DialogTitle>
        </DialogHeader>

        <div className='flex-grow overflow-y-auto pr-2'>
          {step === "input" && (
            <div className='grid gap-4 p-4'>
              <label htmlFor='amount' className='text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400'>
                Monto en Sats
              </label>
              <Input
                id='amount'
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Ej: 21'
                className='h-14 rounded-2xl border-white/10 bg-white/[0.04] text-center font-display text-2xl text-white placeholder:text-gray-600 focus-visible:ring-bitcoin focus-visible:ring-offset-0'
              />

              <div className='flex flex-col-reverse sm:flex-row gap-2 mt-4'>
                <DialogClose asChild>
                  <button type='button' className='btn btn-md btn-secondary flex-1'>
                    Cancelar
                  </button>
                </DialogClose>
                <button type='button' onClick={handleGenerateInvoice} className='btn btn-md btn-primary !text-ink-950 flex-1'>
                  Generar Factura
                </button>
              </div>
            </div>
          )}

          {step === "loading" && (
            <div className='flex flex-col items-center justify-center p-8 gap-4'>
              <Loader2 className='h-12 w-12 animate-spin text-bitcoin' />
              <p className='text-gray-400'>Generando factura...</p>
            </div>
          )}

          {step === "waiting" && invoice && (
            <div className='flex flex-col items-center justify-center p-4 gap-4'>
              <div className='flex items-center gap-2 text-gray-400'>
                <Loader2 className='h-4 w-4 animate-spin text-bitcoin' />
                <span>Esperando pago...</span>
              </div>
              <div className='flex-shrink-0 mt-2 rounded-2xl bg-white p-3 shadow-glow'>
                <QRCodeSVG value={invoice} size={220} level={"H"} />
              </div>
              <div className='w-full relative mt-4'>
                <textarea
                  readOnly
                  value={invoice}
                  className='w-full p-3 pr-10 border border-white/10 rounded-2xl bg-white/[0.04] text-xs text-gray-300 resize-none font-mono focus:outline-none focus:border-bitcoin/60'
                  rows={4}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleCopy}
                  className='absolute top-1/2 right-1 -translate-y-1/2 text-gray-400 hover:bg-white/10 hover:text-bitcoin'
                >
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
              <div className='w-full text-center'>
                {npub && signer && (
                  <>
                    <div className='flex items-center my-1'>
                      <Separator className='flex-1 bg-white/10' />
                      <span className='px-4 text-sm text-gray-500'>
                        ó
                      </span>
                      <Separator className='flex-1 bg-white/10' />
                    </div>
                    <button
                      type='button'
                      onClick={handleZap}
                      className='btn btn-md btn-primary !text-ink-950 w-full mt-4'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : (
                        <Zap className='h-4 w-4' />
                      )}
                      ZAPEAR
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {step === "success" && (
            <div className='flex flex-col items-center justify-center p-8 gap-4 text-center'>
              <CheckCircle2 className='h-16 w-16 text-bitcoin drop-shadow-[0_0_18px_rgba(247,147,26,0.6)]' />
              <h3 className='display text-3xl text-white'>¡Pago Recibido!</h3>
              <p className='text-gray-400'>
                Gracias por tu donación de {amount} sats.
              </p>
              <DialogClose asChild>
                <button type='button' className='btn btn-md btn-primary !text-ink-950 mt-4'>Cerrar</button>
              </DialogClose>
            </div>
          )}

          {step === "error" && (
            <div className='flex flex-col items-center justify-center p-8 gap-4 text-center'>
              <AlertCircle className='h-12 w-12 text-red-400' />
              <p className='font-semibold text-white'>Error</p>
              <p className='text-sm text-gray-400'>{errorMessage}</p>
              <button
                type='button'
                onClick={resetFlow}
                className='btn btn-md btn-secondary mt-4 w-full sm:w-auto'
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LnPayment;
