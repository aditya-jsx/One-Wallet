import { MemoryRouter, Routes, Route } from 'react-router-dom';

const Welcome = () => {
  const handleOpenSetup = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-space-between gap-8 text-white">
        <div className='flex flex-col gap-4 items-center justify-center h-[90%] w-full'>
            <div className='flex gap-2'>
                <img src="/wallet.png" alt="" className='h-10 w-10'/>
                <h1 className="text-4xl font-bold text-center">
                    One Wallet
                </h1>
            </div>
            <div className='flex'>
                <h1 className='text-center text-xl'>
                    To get started, create a new wallet or import an existing one.
                </h1>
            </div>
        </div>
        <div className="flex flex-col h-[10%] w-full justify-end items-center gap-4"> 
          <button onClick={handleOpenSetup} className="bg-blue-500 hover:bg-blue-700 text-white py-2 w-full text-center rounded-xl text-2xl cursor-pointer">
            Create Wallet
          </button>
        </div>
    </div>
    </>
  );
};

const App = () => {
  return (
    <MemoryRouter>
      <div className="h-[600px] w-[360px] flex flex-col bg-zinc-950 p-4 font-sans text-white">
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;