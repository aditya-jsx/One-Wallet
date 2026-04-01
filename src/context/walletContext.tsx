import { createContext, useContext, useState } from "react";

interface SetupData {
    username?: string;
    password?: string;
    mnemonic?: string;
}

interface WalletContextType {
    setupData: SetupData;
    updateSetup: (newData: Partial<SetupData>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({children} : {children : React.ReactNode}) => {

    const [setupData, setSetupData] = useState<SetupData>({});

    const updateSetup = (newData: Partial<SetupData>) => {
        setSetupData((prev) => ({...prev, ...newData}));
    };

    return (
        <WalletContext.Provider value={{ setupData, updateSetup }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWalletSetup = () => {
    const context = useContext(WalletContext);
    if(!context) throw new Error("useWalletSetup must be used within WalletProvider");
    return context;
};