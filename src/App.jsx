
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import logo from './logo.svg'
import DonationForm from './components/donationForm';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import {
  WalletModalProvider,
} from '@tronweb3/tronwallet-adapter-react-ui';

function App() {
  // const { address, wallet, connected, select, connect, disconnect } = useWallet();

  const [myMessage, setMyMessage] = useState();
  const [myDetails, setMyDetails] = useState({
    name: 'none',
    address: 'none',
    balance: 0,
    frozenBalance: 0,
    network: 'none',
    link: 'false',
  });

  function onError(e) {
    if (e instanceof WalletNotFoundError) {
      // some alert for wallet not found
      // setMyMessage(<h3 className='text-head'>WALLET NOT FOUND</h3>);

    } else if (e instanceof WalletDisconnectedError) {
      // some alert for wallet not connected
      // setMyMessage(<h3 className='text-head'>WALLET NOT CONNECTED</h3>);

    } else {
      console.error(e.message);
    }
  }

  const adapters = useMemo(function () {
    const tronLink = new TronLinkAdapter();
    return [tronLink];
  }, []);


  useEffect(() => {
    const interval = setInterval(async () => {

      //wallet checking interval 2sec
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });



  return (
    <div className="App">
      <div className="Card">
        <div className="Logo">
          <img
            src={logo}
            alt="logo"
          />

        </div>
        {<>
          <div>
            <WalletProvider onError={onError} autoConnect={true} disableAutoConnectOnLoad={true} adapters={adapters}>
              <WalletModalProvider>
                <DonationForm />
              </WalletModalProvider>
            </WalletProvider>
          </div>
        </>}

      </div>
    </div>
  );
}

export default App;
