import React, { createContext, useContext, useState, useEffect } from 'react';

type NetworkType = 'mainnet-beta' | 'devnet' | 'testnet';

interface NetworkContextType {
  network: NetworkType;
  rpcUrl: string;
  setNetwork: (network: NetworkType) => void;
}

const RPC_URL = import.meta.env.VITE_RPC_URL;
const RPC_DEVNET_URL = import.meta.env.VITE_RPC_DEVNET_URL;

const RPC_MAPPING: Record<NetworkType, string> = {
  'mainnet-beta': RPC_URL,
  'devnet': RPC_DEVNET_URL,
  'testnet': "https://api.testnet.solana.com"
};

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetworkState] = useState<NetworkType>('devnet');
  const [rpcUrl, setRpcUrl] = useState<string>(RPC_MAPPING['devnet']);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(["preferred_network"], (res) => {
        if (res.preferred_network) {
          setNetworkState(res.preferred_network as NetworkType);
          setRpcUrl(RPC_MAPPING[res.preferred_network as NetworkType]);
        }
      });
    }
  }, []);

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    setRpcUrl(RPC_MAPPING[newNetwork]);
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ "preferred_network": newNetwork });
    }
  };

  return (
    <NetworkContext.Provider value={{ network, rpcUrl, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) throw new Error("useNetwork must be used within NetworkProvider");
  return context;
};