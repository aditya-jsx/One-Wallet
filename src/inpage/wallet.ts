import type { Wallet } from '@wallet-standard/base';
import type { StandardConnectFeature, StandardDisconnectFeature, StandardEventsFeature } from '@wallet-standard/features';
import type { SolanaSignAndSendTransactionFeature, SolanaSignTransactionFeature, SolanaSignMessageFeature } from '@solana/wallet-standard-features';
import { OneWalletAccount } from './account';
import { PublicKey } from '@solana/web3.js';
import type { StandardEventsListeners } from '@wallet-standard/features';

export class OneWalletStandard implements Wallet {
  readonly version = '1.0.0';
  readonly name = 'One Wallet';
  readonly icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; 
  readonly chains = ['solana:mainnet', 'solana:devnet', 'solana:testnet'] as const;

  #accounts: readonly OneWalletAccount[] = [];
  #listeners: { [E in keyof StandardEventsListeners]?: StandardEventsListeners[E][] } = {};

  get accounts() {
    return this.#accounts;
  }

  // Map the required features the dApp will call
  get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SolanaSignAndSendTransactionFeature & SolanaSignTransactionFeature & SolanaSignMessageFeature {
    return {
      'standard:connect': {
        version: '1.0.0',
        connect: async (options) => {
          // Sending request to background.ts
          const response = await this.#sendMessageToBackground('connect', options);
          
          if (response.publicKey) {
            const pubKey = new PublicKey(response.publicKey);
            const account = new OneWalletAccount(pubKey.toBase58(), pubKey.toBytes());
            this.#accounts = [account];
            this.#emit('change', { accounts: this.accounts });
            return { accounts: this.accounts };
          }
          throw new Error('Connection rejected');
        },
      },
      'standard:disconnect': {
        version: '1.0.0',
        disconnect: async () => {
          this.#accounts = [];
          this.#emit('change', { accounts: this.accounts });
        },
      },
      'standard:events': {
        version: '1.0.0',
        on: (event: string, listener: any) => {
          this.#listeners[event as keyof StandardEventsListeners] = (this.#listeners[event as keyof StandardEventsListeners] || []).concat(listener);
          return () => {
            const listeners = this.#listeners[event as keyof StandardEventsListeners];
            if (listeners) {
                this.#listeners[event as keyof StandardEventsListeners] = listeners.filter((l: any) => l !== listener) as any;
            }
          };
        },
      },
      'solana:signAndSendTransaction': {
        version: '1.0.0',
        supportedTransactionVersions: ['legacy', 0],
        signAndSendTransaction: async (...inputs) => {
          // Serialize transactions, send to background.ts, wait for user approval & signature
          const response = await this.#sendMessageToBackground('signAndSendTransaction', { inputs });
          return response.signatures.map((sig: string) => ({ signature: new Uint8Array(Buffer.from(sig, 'hex')) }));
        },
      },
      'solana:signTransaction': {
        version: '1.0.0',
        supportedTransactionVersions: ['legacy', 0],
        signTransaction: async (...inputs) => {
          // Send to background for signing only
          const response = await this.#sendMessageToBackground('signTransaction', { inputs });
          return response.signedTransactions; 
        }
      },
      'solana:signMessage': {
        version: '1.0.0',
        signMessage: async (...inputs) => {
          // Send raw message bytes to background to be signed
          const response = await this.#sendMessageToBackground('signMessage', { inputs });
          return response.signedMessages;
        }
      }
    };
  }

  // Internal helper to communicate with the content script
  #sendMessageToBackground(method: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestId = crypto.randomUUID();
      
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.target === 'one-wallet-inpage' && event.data?.requestId === requestId) {
          window.removeEventListener('message', handleMessage);
          if (event.data.error) reject(new Error(event.data.error));
          else resolve(event.data.result);
        }
      };
      window.addEventListener('message', handleMessage);

      window.postMessage({
        target: 'one-wallet-content',
        method,
        params,
        requestId
      }, '*');
    });
  }

  // Internal helper to trigger standard events
  #emit<E extends keyof StandardEventsListeners>(
    event: E,
    ...args: Parameters<StandardEventsListeners[E]>
  ) {
    const listeners = this.#listeners[event];
    if (listeners) {
        listeners.forEach((listener: any) => listener(...args));
    }
  }
}