import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import CreateWallet from './pages/createWallet';
import { WalletProvider } from './context/walletContext';

import CreatePassword from './pages/Createpassword';
import RecoveryPhrase from './pages/RecoveryPhrase';
import CreateUsername from './pages/CreateUsername';

const Welcome = () => {
  return(
    <div className="h-[482px] w-[420px] bg-zinc-950 flex flex-col items-center justify-center gap-8 text-white rounded-2xl p-5 shadow-2xl">
      <div className='flex flex-col gap-4 items-center justify-center h-[90%] w-full'>
          <div className='flex items-center'>
              <img src="/wallet.png" alt="" className='h-15'/>
              <h1 className="text-5xl font-bold text-center">
                  one wallet
              </h1>
          </div>
          <div className='flex'>
              <h1 className='text-center text-lg text-gray-300'>
                  To get started, create a new wallet or import an existing one.
              </h1>
          </div>
      </div>
      <div className='flex h-[10%] w-full'>
          <div className="flex flex-col w-full justify-end items-center gap-2"> 
            <Link to="/createWallet" className="bg-[#aca0f2] text-black w-full py-2.5 text-center rounded-2xl text-lg hover:bg-[#9b8df0]">Create a new Wallet</Link>
            <Link to="/importSeed" className="bg-[#292929] text-white w-full py-2.5 text-center rounded-2xl text-lg hover:bg-[#333333]">I Already Have a Wallet</Link>
          </div>
      </div>
    </div>
  )
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <MemoryRouter>
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#e3e0ff] font-sans">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/createWallet" element={<CreateWallet />} />
            <Route path="/createPassword" element={<CreatePassword />} />
            <Route path="/recoveryPhrase" element={<RecoveryPhrase />} />
            <Route path="/createUsername" element={<CreateUsername />} />
          </Routes>
        </div>
      </MemoryRouter>
    </WalletProvider>
  </StrictMode>
);