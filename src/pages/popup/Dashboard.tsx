// import { useEffect, useState } from 'react';
// import ActionButton from '../../components/ActionButton';
// import { Send } from "lucide-react"
// import { ArrowLeftRight } from "lucide-react"
// import { QrCode } from "lucide-react"
// import { DollarSign } from "lucide-react"
// import { useNavigate } from 'react-router-dom';
// import TokensBox from '../../components/TokensBox';

// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// const RPC_URL = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";

// export default function Dashboard({ onLock }: { onLock: () => void }) {
//   const [username, setUsername] = useState('Wallet 1');
//   const navigate = useNavigate();
//   const [balance, setBalance] = useState(0)

//   useEffect(() => {
//     // Fetch username for display
//     if (typeof chrome !== 'undefined' && chrome.storage) {
//       chrome.storage.local.get(["one_wallet_data"], (res) => {
//         if (res.one_wallet_data?.username) setUsername(res.one_wallet_data.username);
//       });
//     }
//   }, []);

//   const accountInfo = async () => {
//     const connection = new Connection(RPC_URL, "confirmed");
//     const publicKey = new PublicKey("EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi");
//     const balance = await connection.getBalance(publicKey);

//     setBalance(balance / 1e9); // Convert lamports to SOL
//   }

//   useEffect(() => {
//     accountInfo();
//   }, [])

//   const actionButtonData = [
//   { action: 'Send', icon: Send, onClick: () => navigate('/send') },
//   { action: 'Swap', icon: ArrowLeftRight, onClick: () => navigate('/swap') },
//   { action: 'Receive', icon: QrCode, onClick: () => navigate('/receive') },
//   { action: 'Buy', icon: DollarSign, onClick: () => navigate('/buy') },
// ];

//   return (
//     <div className="flex-1 flex flex-col bg-[#1a1a1a9f]">
//       {/* Header */}
//       <header className="flex justify-between items-center py-2 border-b border-zinc-800 px-4">
//         {/* <div className=''> */}
//           <div className='group flex justify-between items-center'>
//             <div className="flex items-center gap-2 cursor-pointer  py-1.5 rounded-full">
//                 <div className="w-8 h-8 bg-green-500 rounded-full"></div>
//                 <span className="font-semibold text-sm">{username}</span>
//             </div>
//             <div className="hover:flex absolute w-[300px] top-10 left-5 bg-zinc-950 flex-col hidden group-hover:flex items-center gap-1 mt-2 text-zinc-400 p-1 rounded-xl">
//                 <div className='flex items-center justify-between w-full rounded'>
//                   <span className="px-2 py-1 rounded text-xs">Real time Data</span>
//                   <button className="hover:text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//                   </button>
//                 </div>
//                 <div className='flex items-center justify-between w-full rounded'>
//                   <span className="px-2 py-1 rounded text-xs">Real time Data</span>
//                   <button className="hover:text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//                   </button>
//                 </div>
//                 <div className='flex items-center justify-between w-full rounded'>
//                   <span className="px-2 py-1 rounded text-xs">Real time Data</span>
//                   <button className="hover:text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//                   </button>
//                 </div>
//                 <div className='flex items-center justify-between w-full rounded'>
//                   <span className="px-2 py-1 rounded text-xs">Real time Data</span>
//                   <button className="hover:text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//                   </button>
//                 </div>
//                 <div className='flex items-center justify-between w-full rounded'>
//                   <span className="px-2 py-1 rounded text-xs">Real time Data</span>
//                   <button className="hover:text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//                   </button>
//                 </div>
//             </div>
//           </div>
//           <button onClick={onLock} className="absolute right-2 text-zinc-400 hover:text-white p-2 cursor-pointer">
//              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
//               </svg>
//           </button>
//         {/* </div> */}
//       </header>

//       {/* Balance Area */}
//       <div className="flex flex-col items-center justify-center py-10">
//         <h2 className="text-4xl font-bold tracking-tight">${balance}</h2>
//         <div className="flex items-center gap-2 mt-2 text-zinc-400">
//             <span className="bg-[#1e1e1e] px-2 py-1 rounded text-xs">Real time value</span>
//             <button className="hover:text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
//             </button>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-center gap-2">
//         {/* <ActionButton action='Send' icon={Send} onClick={()=>{alert("buttton clicked")}} /> */}
//         {actionButtonData.map((btn, index) => <ActionButton key={index} {...btn} />)}
//       </div>

//       {/* Tokens */}
//       <div className='px-3'>
//         <h1 className="text-xl font-semibold mt-6 mb-2">Tokens</h1>
//         <TokensBox />
//       </div>


//       {/* Tab Bar (Bottom) */}
//       <div className="mt-auto border-t border-zinc-800 flex justify-around p-4">
//           {/* Tab Icons */}
//           <div className="w-10 h-10 text-[#aca0f2]">■</div>
//           <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚡</div>
//           <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚙</div>
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';
import { Send, ArrowLeftRight, QrCode, DollarSign, Copy, ExternalLink, Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TokensBox from '../../components/TokensBox';

import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";

export default function Dashboard({ onLock }: { onLock: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Wallet 1');
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  // Helper to shorten the address (e.g., "EJj7...KBi")
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    // Fetch user data and public key from Chrome storage
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(["one_wallet_data", "publicKey"], (res) => {
        if (res.one_wallet_data?.username) setUsername(res.one_wallet_data.username);
        // For testing, we fallback to your devnet address if storage is empty.
        const activeKey = res.publicKey || "EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi";
        setPublicKey(activeKey);
      });
    } else {
      // Fallback for local browser testing outside of extension
      setPublicKey("EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi");
    }
  }, []);

  useEffect(() => {
    // Only fetch balance if we have a valid public key
    const fetchBalance = async () => {
      if (!publicKey) return;
      try {
        const connection = new Connection(RPC_URL, "confirmed");
        const pubKeyObj = new PublicKey(publicKey);
        const lamports = await connection.getBalance(pubKeyObj);
        setBalance(lamports / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const actionButtonData = [
    { action: 'Send', icon: Send, onClick: () => navigate('/send') },
    { action: 'Receive', icon: QrCode, onClick: () => navigate('/receive') },
    { action: 'Swap', icon: ArrowLeftRight, onClick: () => navigate('/swap') },
    { action: 'Buy', icon: DollarSign, onClick: () => navigate('/buy') },
  ];

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white min-h-[600px]">
      
      {/* Header */}
      <header className="flex justify-between items-center py-3 border-b border-zinc-800 px-4 relative z-10">
        
        {/* Account Dropdown Area */}
        <div className='group relative cursor-pointer'>
          <div className="flex items-center gap-2 py-1.5 px-2 hover:bg-[#1e1e1e] rounded-xl transition-colors">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#aca0f2] to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-inner">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-tight">{username}</span>
                <span className="text-xs text-zinc-400 font-mono">{truncateAddress(publicKey || "")}</span>
              </div>
          </div>

          {/* Cleaned up Hover Dropdown */}
          <div className="absolute top-12 left-0 w-[220px] bg-[#1e1e1e] border border-zinc-800 hidden flex-col group-hover:flex items-center gap-1 text-zinc-300 p-2 rounded-xl shadow-2xl">
              <button onClick={handleCopy} className='flex items-center gap-3 w-full p-2 hover:bg-[#292929] rounded-lg transition-colors text-sm'>
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Address"}
              </button>
              <button onClick={() => window.open(`https://explorer.solana.com/address/${publicKey}?cluster=devnet`, '_blank')} className='flex items-center gap-3 w-full p-2 hover:bg-[#292929] rounded-lg transition-colors text-sm'>
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </button>
          </div>
        </div>

        {/* Lock Button */}
        <button onClick={onLock} className="text-zinc-400 hover:text-white p-2 transition-colors cursor-pointer" title="Lock Wallet">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </button>
      </header>

      {/* Balance Area */}
      <div className="flex flex-col items-center justify-center py-8">
        {/* Main SOL Balance */}
        <h2 className="text-5xl font-bold tracking-tight mb-2">
          {balance.toFixed(4)} <span className="text-2xl text-zinc-400">SOL</span>
        </h2>
        
        {/* Mock USD Value */}
        <div className="flex items-center gap-2 text-zinc-400 bg-[#1e1e1e] px-3 py-1 rounded-lg shadow-sm">
            <span className="text-sm font-medium">≈ ${(balance * 150).toFixed(2)} USD</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2 mb-6">
        {actionButtonData.map((btn, index) => (
          <ActionButton key={index} action={btn.action} icon={btn.icon} onClick={btn.onClick} />
        ))}
      </div>

      {/* Tokens List */}
      <div className='px-4 flex-1 overflow-y-auto'>
        <h1 className="text-lg font-bold text-white mb-3">Tokens</h1>
        <TokensBox />
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto bg-[#121212] border-t border-zinc-800 flex justify-around p-3 pb-4">
          <button className="p-2 text-[#aca0f2] hover:bg-[#1e1e1e] rounded-xl transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.06 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" /></svg>
          </button>
          {/* <button className="p-2 text-zinc-500 hover:text-white hover:bg-[#1e1e1e] rounded-xl transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg>
          </button> */}
          <button className="p-2 text-zinc-500 hover:text-white hover:bg-[#1e1e1e] rounded-xl transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" /></svg>
          </button>
      </div>
    </div>
  );
}