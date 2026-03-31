import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mnemonic } from '../utils/solana';

const RecoveryPhrase = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    alert(`Generated Recovery Phrase:\n\n${mnemonic}`);
  }, [])

  const mockPhrase = [
    "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "abandon", 
    "abandon", "abandon", "abandon", "about"
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockPhrase.join(' '));
    alert('Recovery phrase copied to clipboard!');
  };

  return (
    <div className="w-[420px] flex flex-col text-white bg-zinc-950 rounded-2xl p-6 shadow-2xl relative">
      
      {/* Top Header */}
      <div className="flex items-center w-full mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {/* Step indicators */}
        <div className="flex-1 flex justify-center space-x-2">
           <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
           <div className="w-2 h-2 rounded-full bg-[#aca0f2]"></div>
        </div>
        <div className="w-7"></div>
      </div>

      {/* Headings */}
      <h1 className="text-3xl font-bold text-center mb-2">Secret Recovery Phrase</h1>
      <p className="text-zinc-400 text-center text-sm mb-1">
        Save these words in a safe place.
      </p>
      <p className="text-[#aca0f2] text-center text-sm font-medium cursor-pointer hover:underline mb-6">
        Read the warnings again
      </p>

      {/* Seed Phrase Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {mockPhrase.map((word, index) => (
          <div 
            key={index} 
            className="flex bg-[#1e1e1e] border border-zinc-800 rounded-lg py-2.5 px-3 text-sm items-center hover:border-zinc-700 transition-colors"
          >
            <span className="text-zinc-500 w-5 select-none text-xs">{index + 1}</span>
            <span className="font-medium tracking-wide text-zinc-200">{word}</span>
          </div>
        ))}
      </div>

      {/* Copy to Clipboard */}
      <div className="flex justify-center mb-auto">
        <button 
          onClick={copyToClipboard} 
          className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          Copy to clipboard
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 space-y-4">
        {/* Interactive Checkbox Tile */}
        <label className="flex items-center gap-3 cursor-pointer group bg-[#1e1e1e] p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              className="peer appearance-none w-5 h-5 border-2 border-zinc-600 rounded checked:bg-[#aca0f2] checked:border-[#aca0f2] transition-colors cursor-pointer"
              checked={saved}
              onChange={(e) => setSaved(e.target.checked)}
            />
            <svg className="absolute w-3 h-3 text-zinc-900 pointer-events-none opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
            I saved my Secret Recovery Phrase
          </span>
        </label>

        {/* Next Button */}
        <button 
          disabled={!saved}
          className={`w-full py-3.5 rounded-xl text-lg font-semibold transition-colors duration-200 ${
            saved 
              ? 'bg-[#aca0f2] text-black hover:bg-[#9b8df0] cursor-pointer' 
              : 'bg-[#292929] text-zinc-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
      
    </div>
  );
};

export default RecoveryPhrase;