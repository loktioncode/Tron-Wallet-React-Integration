 
import { React, useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import DonationForm from './SupportForm';
// import TronWeb from 'tronweb';

function App() {
  const [myMessage, setMyMessage] = useState(<h3 className='text-head'> LOADING.. </h3>);
  const [myDetails, setMyDetails] = useState({
    name: 'none',
    address: 'none',
    balance: 0,
    frozenBalance: 0,
    network: 'none',
    link: 'false',
  });

  const getBalance = async () => {
    //if wallet installed and logged , getting TRX token balance
    if (window.tronWeb && window.tronWeb.ready) {
      let walletBalances = await window.tronWeb.trx.getAccount(
        window.tronWeb.defaultAddress.base58
      );
      return walletBalances;
    } else {
      return 0;
    }
  };

  const getWalletDetails = async () => {
    if (window.tronWeb) {
      //checking if wallet injected
      if (window.tronWeb.ready) {
        let tempBalance = await getBalance();
        let tempFrozenBalance = 0;

        if (!tempBalance.balance) {
          tempBalance.balance = 0;
          tempFrozenBalance = 0;
        }

        //we have wallet and we are logged in
        setMyMessage(<h3 className='text-head'>WALLET CONNECTED</h3>);
        setMyDetails({
          name: window.tronWeb.defaultAddress.name,
          address: window.tronWeb.defaultAddress.base58,
          balance: tempBalance.balance / 1000000,
          frozenBalance: tempFrozenBalance / 1000000,
          network: window.tronWeb.fullNode.host,
          link: 'true',
        });
      } else {
        //we have wallet but not logged in
        setMyMessage(<h3 className='text-head'>WALLET DETECTED PLEASE LOGIN</h3>);
        setMyDetails({
          name: 'none',
          address: 'none',
          balance: 0,
          frozenBalance: 0,
          network: 'none',
          link: 'false',
        });
      }
    } else {
      //wallet is not detected at all
      setMyMessage(<h3 className='text-head'>WALLET NOT DETECTED</h3>);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      getWalletDetails();
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
        <div className="Stats">
          {myMessage}
          <h4 className='text-red-900'>Account Name: {myDetails.name} </h4>
          <h4>My Address: {myDetails.address}</h4>
          <h4>
            Balance: {myDetails.balance} TRX (Frozen:{' '}
            {myDetails.frozenBalance} TRX)
          </h4>
          <h4>Network Selected: {myDetails.network}</h4>
          <h4>Link Established: {myDetails.link}</h4>
        </div>
        <div>
         <DonationForm />
        </div>
  
      </div>
    </div>
  );
}

export default App;
