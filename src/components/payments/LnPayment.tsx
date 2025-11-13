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
  const [step, setStep] = useState<'input' | 'loading' | 'waiting' | 'success' | 'error'>('input');
  const [amount, setAmount] = useState("21");
  const [invoice, setInvoice] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { handleZap, isLoading } = useNIP57({
    communityNpub: npub || '',
    satsAmount: Number(amount),
    onPaymentSuccess: () => {
      setStep('success');
    },
    onPaymentError: (msg) => {
      setErrorMessage(msg);
      setStep('error');
    },
  });
  
  useEffect(() => {
    if (step !== 'waiting' || !verifyUrl) {
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
        setErrorMessage("El pago no se confirmó a tiempo. Cierra esta ventana y verifica tu wallet.");
        setStep('error');
        setVerifyUrl(null);
        return;
      }

      try {
        const response = await fetch(getUrlWithBypass(verifyUrl), { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Respuesta inválida del servidor de verificación.");
        }

        const data = await response.json();

        if (data?.settled === true) {
          setStep('success');
          setVerifyUrl(null);
          return;
        }
      } catch (error) {
        console.error("Error durante la verificación del pago:", error);
        setErrorMessage("Hubo un problema al verificar el pago. Cierra esta ventana y revisa tu wallet.");
        setStep('error');
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
      setStep('error');
      return;
    }
    setStep('loading');
    setErrorMessage("");
    try {
      const [user, domain] = lightningAddress.split('@');
      if (!user || !domain) {
        throw new Error("Dirección Lightning inválida.");
      }

      const lnurlpRes = await fetch(`https://${domain}/.well-known/lnurlp/${user}`);
      if (!lnurlpRes.ok) {
        throw new Error("No se pudo contactar al proveedor.");
      }
      const lnurlpData = await lnurlpRes.json();
      if (lnurlpData.status === "ERROR") {
        throw new Error(lnurlpData.reason);
      }

      const amountInMillisats = Number(amount) * 1000;
      const callbackUrl = new URL(lnurlpData.callback);
      callbackUrl.searchParams.append('amount', amountInMillisats.toString());

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

      setStep('waiting');
    } catch (error) {
      console.error("Error generando la factura:", error);
      setErrorMessage(error instanceof Error ? error.message : "Ocurrió un error desconocido.");
      setStep('error');
    }
  };

  const handleCopy = () => {
    if (invoice) {
      navigator.clipboard.writeText(invoice);
      alert("Factura copiada al portapapeles");
    }
  };

  const resetFlow = () => {
    setStep('input');
    setInvoice(null);
    setVerifyUrl(null);
    setErrorMessage("");
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetFlow()}>
      <DialogTrigger asChild>
        <Button className='bg-purple-600 hover:bg-purple-400 text-white'>
          Donar
          <Zap className='ml-2 h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] flex flex-col rounded-lg">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Donar con Lightning</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-2">
          {step === 'input' && (
            <div className="grid gap-4 p-4">
              <label htmlFor="amount" className="text-sm font-medium">Monto en Sats</label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ej: 21" className="text-center text-lg font-medium" />
              
              <div className="flex flex-col-reverse sm:flex-row gap-2 mt-4">
                <DialogClose asChild><Button variant="outline" className="flex-1">Cancelar</Button></DialogClose>
                <Button onClick={handleGenerateInvoice} className="flex-1">Generar Factura</Button>
              </div> 
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center p-8 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-bitcoin" />
              <p className="text-gray-600">Generando factura...</p>
            </div>
          )}

          {step === 'waiting' && invoice && (
            <div className="flex flex-col items-center justify-center p-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Esperando pago...</span>
              </div>
              <div className="flex-shrink-0 mt-2">
                <QRCodeSVG value={invoice} size={220} level={"H"} />
              </div>
              <div className="w-full relative mt-4">
                <textarea readOnly value={invoice} className="w-full p-2 pr-10 border rounded-md bg-gray-100 text-xs text-gray-700 resize-none font-mono" rows={4} />
                <Button variant="ghost" size="icon" onClick={handleCopy} className="absolute top-1/2 right-1 -translate-y-1/2"><Copy className="h-4 w-4" /></Button>
              </div>
              <div className="flex items-center my-1">
                <Separator className="flex-1" />
                <span className="px-4 text-sm text-muted-foreground">ó</span>
                <Separator className="flex-1" />
              </div>
              <div className="w-full text-center">
                {npub && (
                  <Button onClick={handleZap} size="lg" className='w-full bg-purple-600 hover:bg-purple-400' disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    ZAPEAR
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">¡Pago Recibido!</h3>
              <p className="text-gray-600">Gracias por tu donación de {amount} sats.</p>
              <DialogClose asChild><Button className="mt-4">Cerrar</Button></DialogClose>
            </div>
          )}

          {step === 'error' && (
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="font-semibold">Error</p>
              <p className="text-sm text-gray-600">{errorMessage}</p>
              <Button variant="outline" onClick={resetFlow} className="mt-4 w-full sm:w-auto">Reintentar</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LnPayment;