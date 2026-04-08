import { useEffect, useRef, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Unlock from "./pages/popup/Unlock"
import Dashboard from './pages/popup/Dashboard';
import Send from './pages/popup/Actions/Send';
import Receive from './pages/popup/Actions/Receive';
import Swap from './pages/popup/Actions/Swap';
import Buy from './pages/popup/Actions/Buy';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasWallet, setHasWallet] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const hasOpenedTab = useRef(false);

  useEffect(() => {
    if(typeof chrome !== 'undefined' && chrome.storage){
      chrome.storage.local.get(["one_wallet_data"], (result) => {
        if(result.one_wallet_data?.isInitialized){
          setIsInitialized(true);
        }else{
          chrome.tabs.create({ url: 'onboarding.html' });
          window.close;
        }
        setIsLoading(false);
      })
    }else{
      const data = localStorage.getItem("one_wallet_data");
      setIsInitialized(!!data);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div className="w-[360px] h-[600px] bg-zinc-950 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#aca0f2] border-t-transparent rounded-full"></div></div>;

  if (!isInitialized) {
    return <div className="w-[360px] h-[600px] bg-zinc-950 text-white p-6">Please complete setup in the new tab.</div>;
  }
  if (!isUnlocked) {
    return (
      <div className="w-[360px] h-[600px] bg-zinc-950 text-white overflow-hidden flex flex-col">
        <Unlock onUnlock={() => setIsUnlocked(true)} />
      </div>
    );
  }

  // If unlocked, render the MemoryRouter with all your internal extension screens
  return (
    <MemoryRouter>
      <div className="w-[360px] h-[600px] bg-zinc-950 text-white overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<Dashboard onLock={() => setIsUnlocked(false)} />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;