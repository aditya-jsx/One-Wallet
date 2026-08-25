import type { WalletAccount } from '@wallet-standard/base';

export class OneWalletAccount implements WalletAccount {
  readonly address: string;
  readonly publicKey: Uint8Array;
  readonly chains: ('solana:mainnet' | 'solana:devnet' | 'solana:testnet')[];
  readonly features: readonly `${string}:${string}`[];
  readonly label?: string;
  readonly icon?: `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;

  constructor(address: string, publicKeyBytes: Uint8Array) {
    this.address = address;
    this.publicKey = publicKeyBytes;
    this.chains = ['solana:mainnet', 'solana:devnet', 'solana:testnet'];
    this.features = [
      'solana:signAndSendTransaction',
      'solana:signTransaction',
      'solana:signMessage',
    ] as const;
  }
}