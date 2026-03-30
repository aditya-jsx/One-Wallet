import { useEffect, useRef, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasWallet, setHasWallet] = useState(false);
  
  const hasOpenedTab = useRef(false);

  useEffect(() => {
    chrome.storage.local.get(['encryptedWallet'], (result) => {
      if (result.encryptedWallet) {
        setHasWallet(true);
        setIsLoading(false);
      } else {
        if (!hasOpenedTab.current) {
          hasOpenedTab.current = true;
          chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
          window.close(); 
        }
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="h-[600px] w-[360px] flex items-center justify-center bg-zinc-950 text-white font-sans">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <MemoryRouter>
      <div className="h-[600px] w-[360px] flex flex-col bg-zinc-950 p-4 font-sans text-white">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            </div>
          } />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;