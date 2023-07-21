
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import logo from './logo.svg'
import DonationForm from './components/donationForm';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import {
  WalletModalProvider,
} from '@tronweb3/tronwallet-adapter-react-ui';
import toast, { Toaster } from 'react-hot-toast';

function App() {


  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }


  const adapters = useMemo(function () {
    const tronLink = new TronLinkAdapter();
    return [tronLink];
  }, []);


  return (
    <div className="App">
      <div className="Card">
        <div className="Logo">
          <img
            src={logo}
            alt="logo"
          />

        </div>

        <div>
          <WalletProvider onError={onError} autoConnect={true} disableAutoConnectOnLoad={true} adapters={adapters}>
            <WalletModalProvider>
              <DonationForm />
            </WalletModalProvider>
          </WalletProvider>
        </div>


      </div>
    </div>
  );
}

export default App;
