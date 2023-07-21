import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/donationForm.module.css';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import {
    WalletActionButton,
} from '@tronweb3/tronwallet-adapter-react-ui';

function DonationForm() {

    const { address, wallet, connected, select, connect, disconnect, balance } = useWallet();
    const { register, handleSubmit, watch, setValue } = useForm();
    const [selectedAmount, setSelectedAmount] = useState('1');


    const onSubmit = async (data) => {
        console.log(data);
        // onSend(data.amount)
        let xAmount = parseInt(data.amount) * 1000000
        // onSend(xAmount, "recieveraddress")

        onSend(xAmount)
    };

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
    };

    useEffect(() => {
        if (selectedAmount !== 'custom') {
            setValue('amount', selectedAmount)
        }
    }, [selectedAmount])

    const showCustomAmount = selectedAmount === 'custom';

    return (
        <div className={styles.donationForm}>
            {/* <button onClick={toggle}>{visible ? 'Close Modal' : 'Open Modal'}</button> */}
            <h2 className='text-head'>{connected ? 'ENTER TRX AMOUNT TO SUPPORT CREATOR' : 'CONNECT WALLET TO SUPPORT CREATOR'} </h2>

            {connected && <div className="flex flex-wrap justify-between mb-4">
                <div className="Stats">

                    <h4 >Your selected Wallet: {wallet?.adapter.name} </h4>
                    <h4>My Address: {address}</h4>
                </div>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '20' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('20')}
                >
                    TRX 20
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '50' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('50')}
                >
                    TRX 50
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '100' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('100')}
                >
                    TRX 100
                </button>

                <button
                    className={`${styles.amountButton} ${selectedAmount === 'custom' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('custom')}
                >
                    Custom Amount
                </button>

                {(
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {showCustomAmount && <input  {...register("amount")} type="text" id="lname" name="lastname" placeholder="TRX 1"></input>}

                        <input type="submit" value="Submit" ></input>
                    </form>
                )}
            </div>}
            <WalletActionButton className={styles.tronConnectBtn}></WalletActionButton>

            <p style={{ color: '#fff' }}>SUP V 0.03 / 2023 &copy; Loktioncode Clubhouse</p>
        </div>
    );
}

export default DonationForm;
