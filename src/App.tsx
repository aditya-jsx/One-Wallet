import { useEffect, useRef, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Unlock from "./pages/popup/unlock"
import Dashboard from './pages/popup/Dashboard';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasWallet, setHasWallet] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const hasOpenedTab = useRef(false);

  useEffect(() => {
    if(typeof chrome !== undefined && chrome.storage){
      chrome.storage.local.get(["one_wallet_data"], (result) => {
        if(result.one_wallet_data?.isInitialized){
          setIsInitialized(true);
        }else{
          chrome.tabs.create({ url: 'onboarding.html '});
          windows.close;
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

  return (
    <div className="w-[360px] h-[600px] bg-zinc-950 text-white overflow-hidden flex flex-col">
      {isUnlocked ? (
        <Dashboard onLock={() => setIsUnlocked(false)} />
      ) : (
        <Unlock onUnlock={() => setIsUnlocked(true)} />
      )}
    </div>
  );
};

export default App;