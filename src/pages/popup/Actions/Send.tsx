import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Send() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [usdMode, setUsdMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#121212] text-white min-h-[600px] font-sans pt-2">
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        {/* Using a stylized font-serif here to mimic the image's "Send" text */}
        <h1 className="text-xl font-bold tracking-wide font-serif italic text-zinc-100">Send</h1>
        
        <button className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
          </svg>
        </button>
      </header>

      <div className="flex flex-col px-5 flex-1 gap-5 mt-2">
        
        {/* Recipient Address */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-zinc-300 font-medium">Recipient Address</label>
          <div className="flex items-center bg-[#222222] border border-transparent focus-within:border-[#7c3aed] rounded-xl px-3.5 py-3.5 transition-colors">
            <input 
              type="text" 
              placeholder="Paste address or scan code" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-zinc-500 tracking-wide"
            />
            <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5m13.5 0V6A2.25 2.25 0 0015 3.75h-1.5m-6 16.5H6A2.25 2.25 0 013.75 18v-1.5m13.5 0V18A2.25 2.25 0 0115 20.25h-1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Token Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-zinc-300 font-medium">Token</label>
          <button className="flex items-center justify-between bg-[#222222] border border-transparent hover:border-zinc-700 rounded-xl px-3.5 py-3 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center p-2 shadow-inner">
                 <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="SOL" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[15px] font-semibold text-zinc-100">Solana</span>
                <span className="text-[13px] text-zinc-500 font-medium">0 SOL</span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-zinc-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] text-zinc-300 font-medium">Amount</label>
            
            {/* Custom Toggle Switch */}
            <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-400">
              <span>USD</span>
              <button 
                onClick={() => setUsdMode(!usdMode)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${usdMode ? 'bg-[#7c3aed]' : 'bg-zinc-600'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${usdMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center bg-[#222222] border border-transparent focus-within:border-[#7c3aed] rounded-xl px-3.5 py-3.5 transition-colors">
            <input 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-zinc-500 tracking-wide"
            />
            <span className="text-zinc-500 text-[15px] font-medium ml-2">{usdMode ? 'USD' : 'SOL'}</span>
          </div>
        </div>

        {/* Network Fee */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-zinc-300 font-medium">Network Fee</label>
          <div className="flex items-center justify-between bg-[#222222] border border-transparent rounded-xl px-3.5 py-3.5 opacity-60">
            <span className="text-zinc-500 text-[15px] font-medium">~~~</span>
            <span className="text-zinc-500 text-[15px] font-medium">SOL</span>
          </div>
        </div>
        
      </div>

      {/* Review Button */}
      <div className="px-5 pb-6 mt-auto">
        <button 
          disabled={!address || !amount}
          className={`w-full py-4 rounded-[18px] text-[16px] font-semibold transition-all duration-200 ${
            address && amount
              ? 'bg-[#6b46c1] hover:bg-[#5b37a8] text-white cursor-pointer shadow-[0_0_15px_rgba(107,70,193,0.3)]' 
              : 'bg-[#222222] text-zinc-500 cursor-not-allowed'
          }`}
        >
          Review
        </button>
      </div>
      
    </div>
  );
}