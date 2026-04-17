import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { checkIfBalanceIsEnough, getBalance, getPublicKey, sendSol, validateAddress } from '../../../utils/solana';
import { Connection, PublicKey } from '@solana/web3.js';
import { useNetwork } from '../../../context/networkContext';

const Send = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [userKey, setUserKey] = useState<string>('');
  const [userBalance, setUserBalance] = useState(0);
  const [maxAmount, setmaxAmount] = useState(0)
  const [enoughtBalance, setEnoughBalance] = useState(false);
  const isValid = validateAddress(address);
  const [isSending, setIsSending] = useState(false);
  const [successSignature, setSuccessSignature] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

   const { network, rpcUrl, setNetwork } = useNetwork();

  useEffect(() => {
    const fetchBalance = async () => {
      if(!userKey) return;

      const fetchedBalance = await getBalance(userKey, rpcUrl);

      if(fetchedBalance !== undefined){
        setUserBalance(fetchedBalance);
      }
    }
    fetchBalance();
  }, [userKey, rpcUrl]);

  useEffect(() => {
    const BASE_FEE = 0.000005; 
    if (userBalance > BASE_FEE) {
      setmaxAmount(userBalance - BASE_FEE);
    } else {
      setmaxAmount(0);
    }
  }, [userBalance]);

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
      const parsedAmount = parseFloat(amount);
      if(isValid && amount && parsedAmount > 0){
        try{
          const recipientKey = new PublicKey(address);
          // const sendingAmount = parseFloat(amount);

          const {fee, isEnough} = await checkIfBalanceIsEnough(userBalance, recipientKey, parsedAmount);
          const remainingAmount = userBalance - (fee / 1e9);
          console.log(remainingAmount)
          setmaxAmount(remainingAmount > 0 ? remainingAmount : 0);
          setEnoughBalance(isEnough)
        }catch(e){
          setEnoughBalance(false);
        }
      }else{
        setEnoughBalance(false);
      }
    }
    checkBalance();
  }, [amount, address, isValid, userBalance]);

  const handleInitialise = () => {
    if(!isValid || !enoughtBalance) return;
    setPassword("");
    setIsPasswordModalOpen(true);
    setPasswordError("");
  };


  const handleSend = async () => {
    if(!isValid || !enoughtBalance) return;

    const password = window.prompt("Enter Password to sign the transaction: ");
    if(!password) return;

    setIsSending(true);

    try{
      const parsedAmount = parseFloat(amount);
      const recipientKey = new PublicKey(address);

      const signature = await sendSol(recipientKey, parsedAmount);

      setSuccessSignature(signature);
    }catch(e){
      alert("Transaction failed!, Incorrect Password or network error");
    }finally{
      setIsSending(false);
    }
  }

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
        <div className="w-9" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-5 gap-2 overflow-y-auto">
        
        {/* Recipient Input */}
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center">
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
          onClick={() => navigate(-1)} 
          className='w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 bg-[#2A2A2B] text-white cursor-pointer'
        >
          Cancel
        </button>
        <button
          onClick={handleInitialise}
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
      {/* Password Modal Overlay */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm flex flex-col shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Sign Transaction</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Enter your password to authorize sending {amount} SOL.
            </p>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#AB9FF2] transition-colors mb-2"
              autoFocus
            />
            
            {passwordError && (
              <p className="text-red-500 text-xs mb-4 pl-1">{passwordError}</p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                disabled={isSending}
                className="flex-1 py-3 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || !password}
                className="flex-1 py-3 rounded-xl font-semibold bg-[#AB9FF2] hover:bg-[#998ce3] text-black transition-colors flex items-center justify-center"
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;