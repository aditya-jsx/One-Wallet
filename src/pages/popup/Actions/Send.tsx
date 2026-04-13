import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { checkIfBalanceIsEnough, getBalance, getPublicKey, validateAddress } from '../../../utils/solana';
import { Connection, PublicKey } from '@solana/web3.js';

const Send = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [userKey, setUserKey] = useState<string>('');
  const [userBalance, setUserBalance] = useState(0);
  const [maxAmount, setmaxAmount] = useState(0)
  const [enoughtBalance, setEnoughBalance] = useState(false);
  const isValid = validateAddress(address);

  useEffect(() => {
    const fetchBalance = async () => {
      if(!userKey) return;

      const fetchedBalance = await getBalance(userKey);

      if(fetchedBalance !== undefined){
        setUserBalance(fetchedBalance);
      }
    }
    fetchBalance();
  }, [userKey]);

  useEffect(()=>{
    const fetchUserKey = async () => {
      const key = await getPublicKey();
      if(!key) return;
      setUserKey(key);
    }
    fetchUserKey();
  }, []);

  useEffect(() => {
    const checkBalance = async () => {
      if(isValid && amount && parseInt(amount) > 0){
        try{
          const recipientKey = new PublicKey(address);
          const sendingAmount = parseInt(amount);

          const {fee, isEnough} = await checkIfBalanceIsEnough(userBalance, recipientKey, sendingAmount);
          // const fees = fee * 1e9;
          const remainingAmount = userBalance - (fee / 1e9);
          setmaxAmount(remainingAmount > 0 ? remainingAmount : 0);
          setEnoughBalance(isEnough)
        }catch(e){
          setEnoughBalance(false);
        }
      }
    }
    checkBalance();
  }, [amount, address, isValid, userBalance]);

  return (
    <div className="flex flex-col h-[600px] w-full bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#2C2C2C]">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">Send SOL</h1>
        <div className="w-9" /> {/* Spacer for flex centering */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-5 gap-2 overflow-y-auto">
        
        {/* Recipient Input */}
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center">
            {/* {userKey} */}
            <input
              type="text"
              placeholder="Receipient's Solana address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#2a2a2b73] border border-[#3A3A3B] rounded-lg p-2.5 pl-3.5 text-[15px] focus:outline-none transition-colors placeholder:text-gray-500"
            />
            {isValid && (
              <CheckCircle2 size={18} className="absolute right-3 text-green-500" />
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-3">

          {/* Amount Input */}
          <div className="flex flex-col bg-[#2a2a2b73] p-2 px-4 rounded-lg border border-[#3A3A3B] focus-within:border-gray-500 transition-colors">
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-[15px] w-full focus:outline-none text-white placeholder:text-gray-500"
              />
              <span className='pr-2 text-gray-400 text-[15px]'>SOL</span>
              <button 
                onClick={() => setAmount(maxAmount.toString())}
                className="text-sm font-bold bg-gray-500/10 px-2 py-1 rounded-xl hover:bg-gray-500/20 transition-colors"
              >
                MAX
              </button>
            </div>
            {/* {amount && (
              <span className="text-sm text-gray-500 mt-2">
                ~ ${(parseFloat(amount) * 84.25).toFixed(2)} USD
              </span>
            )} */}
          </div>
          <div className='pl-1 pr-2.5 text-gray-500 w-full flex items-center justify-between'>
            {amount && (
              <p className={enoughtBalance ? "text-green-400" : "text-red-500"}>
                ~ ${(parseFloat(amount) * 84.25).toFixed(2)} USD
              </p>
            )}
            <p className='absolute right-6'>Available {userBalance} SOL</p>
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex justify-between gap-5 p-5 mt-auto bg-zinc-950 ">
        <button
          // disabled={!address || !amount}
          onClick={() => navigate(-1)} 
          className='w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 bg-[#2A2A2B] text-white cursor-pointer'
        >
          Cancel
        </button>
        <button
          disabled={!address || !amount || !enoughtBalance || !isValid}
          className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
            address && amount
              ? 'bg-[#AB9FF2] hover:bg-[#998ce3] text-black shadow-lg shadow-purple-900/20 cursor-pointer'
              : 'bg-[#2A2A2B] text-gray-500 cursor-not-allowed'
          }`}
        >
          Review Send
        </button>
      </div>
    </div>
  );
};

export default Send;