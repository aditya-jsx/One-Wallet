import { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';
import { Send } from "lucide-react"
import { ArrowLeftRight } from "lucide-react"
import { QrCode } from "lucide-react"
import { DollarSign } from "lucide-react"
import { useNavigate } from 'react-router-dom';

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const RPC_URL = process.env.RPC_URL || "devnet";

export default function Dashboard({ onLock }: { onLock: () => void }) {
  const [username, setUsername] = useState('Wallet 1');
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    // Fetch username for display
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(["one_wallet_data"], (res) => {
        if (res.one_wallet_data?.username) setUsername(res.one_wallet_data.username);
      });
    }
  }, []);

  const accountInfo = async () => {
    const connection = new Connection(clusterApiUrl(RPC_URL), "confirmed");
    const publicKey = new PublicKey("EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi");
    const balance = await connection.getBalance(publicKey);

    setBalance(balance / 1e9); // Convert lamports to SOL
  }

  useEffect(() => {
    accountInfo();
  }, [])

  const actionButtonData = [
  { action: 'Send', icon: Send, onClick: () => navigate('/send') },
  { action: 'Swap', icon: ArrowLeftRight, onClick: () => navigate('/swap') },
  { action: 'Receive', icon: QrCode, onClick: () => navigate('/receive') },
  { action: 'Buy', icon: DollarSign, onClick: () => navigate('/buy') },
];

  return (
    <div className="flex-1 flex flex-col bg-[#1a1a1a9f]">
      {/* Header */}
      <header className="flex justify-between items-center py-2 border-b border-zinc-800 px-4">
        {/* <div className=''> */}
          <div className='group flex justify-between items-center'>
            <div className="flex items-center gap-2 cursor-pointer  py-1.5 rounded-full">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-sm">{username}</span>
            </div>
            <div className="hover:flex absolute w-[300px] top-10 left-5 bg-zinc-950 flex-col hidden group-hover:flex items-center gap-1 mt-2 text-zinc-400 p-1 rounded-xl">
                <div className='flex items-center justify-between w-full rounded'>
                  <span className="px-2 py-1 rounded text-xs">Real time Data</span>
                  <button className="hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
                <div className='flex items-center justify-between w-full rounded'>
                  <span className="px-2 py-1 rounded text-xs">Real time Data</span>
                  <button className="hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
                <div className='flex items-center justify-between w-full rounded'>
                  <span className="px-2 py-1 rounded text-xs">Real time Data</span>
                  <button className="hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
                <div className='flex items-center justify-between w-full rounded'>
                  <span className="px-2 py-1 rounded text-xs">Real time Data</span>
                  <button className="hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
                <div className='flex items-center justify-between w-full rounded'>
                  <span className="px-2 py-1 rounded text-xs">Real time Data</span>
                  <button className="hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
            </div>
          </div>
          <button onClick={onLock} className="absolute right-2 text-zinc-400 hover:text-white p-2 cursor-pointer">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
          </button>
        {/* </div> */}
      </header>

      {/* Balance Area */}
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-bold tracking-tight">${balance}</h2>
        <div className="flex items-center gap-2 mt-2 text-zinc-400">
            <span className="bg-[#1e1e1e] px-2 py-1 rounded text-xs">Real time value</span>
            <button className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
            </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2">
        {/* <ActionButton action='Send' icon={Send} onClick={()=>{alert("buttton clicked")}} /> */}
        {actionButtonData.map((btn, index) => <ActionButton key={index} {...btn} />)}
      </div>

      {/* Tokens */}
      <div className='px-3'>
        <h1 className="text-xl font-semibold mt-6 mb-2">Tokens</h1>
      </div>


      {/* Tab Bar (Bottom) */}
      <div className="mt-auto border-t border-zinc-800 flex justify-around p-4">
          {/* Tab Icons */}
          <div className="w-10 h-10 text-[#aca0f2]">■</div>
          <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚡</div>
          <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚙</div>
      </div>
    </div>
  );
}