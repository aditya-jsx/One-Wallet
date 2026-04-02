import { useEffect, useState } from 'react';

export default function Dashboard({ onLock }: { onLock: () => void }) {
  const [username, setUsername] = useState('Wallet 1');

  useEffect(() => {
    // Fetch username for display
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(["one_wallet_data"], (res) => {
        if (res.one_wallet_data?.username) setUsername(res.one_wallet_data.username);
      });
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 cursor-pointer bg-[#1e1e1e] px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-sm">{username}</span>
        </div>
        <button onClick={onLock} className="text-zinc-400 hover:text-white p-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </button>
      </header>

      {/* Balance Area */}
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-5xl font-bold tracking-tight">$0.00</h2>
        <div className="flex items-center gap-2 mt-2 text-zinc-400">
            <span className="bg-[#1e1e1e] px-2 py-1 rounded text-xs">7xKX...3b9</span>
            <button className="hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
            </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 px-6">
        {['Receive', 'Send', 'Swap'].map((action) => (
            <div key={action} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 bg-[#aca0f2] text-black rounded-full flex items-center justify-center group-hover:bg-[#9b8df0] transition-colors">
                    {/* Placeholder icon, replace with specific SVGs */}
                    <div className="w-5 h-5 bg-black rounded-sm"></div> 
                </div>
                <span className="text-xs font-medium text-zinc-300">{action}</span>
            </div>
        ))}
      </div>

      {/* Tab Bar (Bottom) */}
      <div className="mt-auto border-t border-zinc-800 flex justify-around p-4 bg-[#111]">
          {/* Tab Icons */}
          <div className="w-6 h-6 text-[#aca0f2]">■</div>
          <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚡</div>
          <div className="w-6 h-6 text-zinc-600 hover:text-zinc-400">⚙</div>
      </div>
    </div>
  );
}