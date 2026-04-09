import { useState } from 'react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  iconUrl: string;
  change24h: number; // Percentage change
}

// Mock data to populate the UI
const mockTokens: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    balance: 1.245,
    priceUsd: 150.25,
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    change24h: 2.4,
  },
//   {
//     symbol: 'USDC',
//     name: 'USD Coin',
//     balance: 50.00,
//     priceUsd: 1.00,
//     iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
//     change24h: 0.01,
//   },
//   {
//     symbol: 'BONK',
//     name: 'Bonk',
//     balance: 1500000,
//     priceUsd: 0.000025,
//     iconUrl: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
//     change24h: -1.2,
//   }
];

const TokensBox = () => {
  // In the future, this state will be populated by an RPC call fetching the user's SPL token accounts
  const [tokens] = useState<Token[]>(mockTokens);

  return (
    <div className="flex flex-col gap-2 pb-4">
      {tokens.map((token, index) => {
        const fiatValue = token.balance * token.priceUsd;
        const isPositive = token.change24h >= 0;

        return (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-[#1e1e1e] hover:bg-[#292929] rounded-xl cursor-pointer transition-colors border border-transparent hover:border-zinc-800"
          >
            {/* Left Side: Icon and Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-zinc-800">
                {token.iconUrl ? (
                  <img src={token.iconUrl} alt={token.symbol} className="w-full h-full object-cover" />
                ) : (
                  // Fallback if image fails to load
                  <div className="w-full h-full bg-gradient-to-tr from-[#aca0f2] to-blue-500 opacity-80"></div>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm tracking-wide">{token.name}</span>
                <span className="text-xs text-zinc-400 font-medium">
                  {token.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} {token.symbol}
                </span>
              </div>
            </div>

            {/* Right Side: Fiat Value and 24h Change */}
            <div className="flex flex-col items-end">
              <span className="font-semibold text-white text-sm">
                ${fiatValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{token.change24h}%
              </span>
            </div>
          </div>
        );
      })}

      {/* Manage Token List */}
      {/* <button className="mt-2 w-full py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#1e1e1e] transition-colors flex items-center justify-center gap-2 border border-dashed border-zinc-800 hover:border-zinc-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Manage token list
      </button> */}
    </div>
  );
}

export default TokensBox;