import { useState, useMemo, useEffect, useCallback } from "react";
import NDK, { NDKEvent, NDKUser } from "@nostr-dev-kit/ndk";
import { NDKZapper, NDKNip07Signer } from "@nostr-dev-kit/ndk";

declare global {
  interface Window {
    webln?: {
      enable: (options?: { name: string }) => Promise<void>;
      sendPayment: (invoice: string) => Promise<any>;
    };
  }
}

interface NIP57PaymentProps {
  communityNpub: string;
  satsAmount: number;
  onPaymentSuccess?: () => void;
  onPaymentError?: (msg: string) => void;
}

export const useNIP57 = ({
  communityNpub,
  satsAmount,
  onPaymentSuccess,
  onPaymentError,
}: NIP57PaymentProps) => {
  const [communityProfile, setCommunityProfile] = useState<NDKUser | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const signer = useMemo(() => {
    return typeof window !== "undefined" && window.nostr
      ? new NDKNip07Signer()
      : null;
  }, []);

  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.current.fyi",
    "wss://relay.nostr.band",
  ];

  const ndk = useMemo(() => new NDK({ explicitRelayUrls: relays }), []);

  const fetchProfile = useCallback(async () => {
    if (communityProfile) return; // Already loaded
    try {
      await ndk.connect(2000);
      const user = await ndk.fetchUser(communityNpub);
      if (user) {
        await user.fetchProfile();
        setCommunityProfile(user);
      }
    } catch (error) {
      console.warn("Error fetching profile:", error);
      throw error; // Throw to handle in handleZap
    }
  }, [communityProfile, ndk, communityNpub]);

  useEffect(() => {
    if (communityNpub) {
      fetchProfile().catch((error) => {
        // Handle unhandled promise rejection
        console.error("Unhandled error in fetchProfile:", error);
      });
    }
  }, [communityNpub, fetchProfile]);

  const handleError = (msg: string) => {
    onPaymentError?.(msg);
    setIsLoading(false);
    return;
  };

  const handleZap = async () => {
    setIsLoading(true);

    if (satsAmount <= 0) return handleError("Monto inválido");
    if (!communityNpub) return handleError("La comunidad no tiene npub válido");
    if (!communityProfile)
      return handleError(
        "Perfil de la comunidad no cargado aún, intenta de nuevo"
      );
    if (!communityProfile.profile?.lud16 && !communityProfile.profile?.lud06)
      return handleError("La comunidad no tiene dirección Lightning asociada");

    if (!signer) return handleError("Instala nos2x o Alby para continuar");
    ndk.signer = signer;

    try {
      const msatsAmount = satsAmount * 1000;
      if (!window.webln?.enable || !window.webln?.sendPayment) {
        return handleError(
          "Tu navegador no tiene Alby u otra wallet LN compatible instalada para poder pagar"
        );
      }

      const webln = window.webln!;
      const lnPay = async ({ pr }: { pr: string }) => {
        await webln.enable({ name: "Zap App" });
        const payment: { preimage: string } = await webln.sendPayment(pr);
        const receipt = new NDKEvent(ndk, {
          kind: 9735,
          content: "",
          tags: [
            ["p", communityProfile.pubkey],
            ["preimage", payment.preimage],
          ],
          created_at: Math.floor(Date.now() / 1000),
        });
        await receipt.sign();
        await receipt.publish();

        onPaymentSuccess?.();
        return { preimage: payment.preimage };
      };

      const zapper = new NDKZapper(communityProfile, msatsAmount, "msat", {
        lnPay,
      });
      await zapper.zap();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      onPaymentError?.(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleZap,
    isLoading,
    signer,
  };
};
