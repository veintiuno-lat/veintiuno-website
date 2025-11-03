import React, { useState, useMemo, useEffect } from 'react';
import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';
import { NDKZapper, NDKNip07Signer } from '@nostr-dev-kit/ndk';
import { Button } from '@/components/ui/button';

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

const NIP57Payment: React.FC<NIP57PaymentProps> = ({
  communityNpub,
  satsAmount,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const relays = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.current.fyi', // ← Más confiable
    'wss://relay.nostr.band',
  ];

  const ndk = useMemo(() => new NDK({ explicitRelayUrls: relays }), []);
  const signer = useMemo(() => {
    if (typeof window !== 'undefined' && window.nostr) {
      return new NDKNip07Signer();
    }
    return null;
  }, []);

  useEffect(() => {
    if (signer) {
      ndk.signer = signer;
    }
  }, [ndk, signer]);

  const handleError = (msg: string) => {
    setErrorMessage(msg);
    onPaymentError?.(msg);
    return;
  };

  const handleZap = async () => {
    setErrorMessage('');
    if (satsAmount <= 0) return handleError('Monto inválido');
    if (!communityNpub) return handleError('La comunidad no tiene npub válido');
    if (!signer) return handleError('Instala nos2x o Alby para continuar');
    
    try {
      await ndk.connect(5000);
    } catch (error) {
      console.warn('Error conectando:', error);
      handleError('No se pudo conectar a relays');
      return;
    }
    try {
      const communityProfile = await ndk.fetchUser(communityNpub)
      if (!communityProfile) return handleError('No se pudo obtener el perfil de la comunidad');
      await communityProfile.fetchProfile();
      console.log('Perfil obtenido:', {
        pubkey: communityProfile.pubkey,
        lud16: communityProfile.profile?.lud16,
        lud06: communityProfile.profile?.lud06
      });
      if (!communityProfile.profile?.lud16 && !communityProfile.profile?.lud06) return handleError('La comunidad no tiene dirección Lightning asociada');
      const msatsAmount = satsAmount * 1000;
      if (!window.webln?.enable || !window.webln?.sendPayment) return handleError('Tu navegador no tiene Alby u otra wallet Lightning compatible instalada');

      const webln = window.webln!;
      const lnPay = async ({ pr }: { pr: string }) => {
        console.log('lnPay ejecutándose con invoice:', pr.substring(0, 50) + '...');
        await webln.enable({ name: 'Zap App' });
        console.log('WebLN habilitado, enviando pago...');
        const payment: { preimage: string } = await webln.sendPayment(pr);
        console.log('Pago enviado, preimage:', payment.preimage.substring(0, 20) + '...');

        const receipt = new NDKEvent(ndk, {
          kind: 9735,
          content: '',
          tags: [['p', communityProfile.pubkey], ['preimage', payment.preimage]],
          created_at: Math.floor(Date.now() / 1000),
        });
        await receipt.sign();
        await receipt.publish();

        onPaymentSuccess?.();
        return { preimage: payment.preimage };
      };
      console.log('Creando zapper con:', {
        profile: communityProfile.pubkey,
        amount: msatsAmount,
        lud16: communityProfile.profile?.lud16,
        lud06: communityProfile.profile?.lud06
      });
      const zapper = new NDKZapper(communityProfile, msatsAmount, "msat", { lnPay });
      console.log('Ejecutando zap...');
      await zapper.zap();
      console.log('Zap completado exitosamente');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setErrorMessage(msg);
      onPaymentError?.(msg);
    }
  };

  return (
    <>
      <Button 
        onClick={handleZap} 
        size="lg" 
        className='w-full bg-purple-600 hover:bg-purple-400'>
          ZAPEAR
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};

export { NIP57Payment };