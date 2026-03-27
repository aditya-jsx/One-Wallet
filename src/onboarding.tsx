import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CreateWallet from './pages/createWallet';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MemoryRouter>
      <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans bg-[#e3e0ff]">
        <div className='text-black absolute top-5 left-5'>
            <img src="/public/wallet.png" alt="" className='h-15'/>
        </div>
        <Routes>
          <Route path="/" element={<CreateWallet />} />
        </Routes>
      </div>
    </MemoryRouter>
  </StrictMode>
);