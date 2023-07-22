import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/donationForm.module.css';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import {
    WalletActionButton,
} from '@tronweb3/tronwallet-adapter-react-ui';
import { onSend } from '../utils/tron';
import toast from 'react-hot-toast';


function DonationForm() {

    const { address, wallet, connected, select, connecting, disconnect, balance } = useWallet();
    const { register, handleSubmit, watch, setValue } = useForm();
    const [selectedAmount, setSelectedAmount] = useState('20');
    const [open, setOpen] = useState(false);
    const [sentSuccessfully, setSentSuccessfully] = useState(false);
    const [failedSending, setFailedSend] = useState(false);

    const [loading, setLoading] = useState(false);



    const onSubmit = async (data) => {
        let xAmount = parseInt(data.amount) * 1000000
        setLoading(!loading)
        await onSend(null, xAmount).then((res) => {
            setSentSuccessfully(!sentSuccessfully);
            disconnect();
        }).catch(err => alert("failed to send crypto"));
    };

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
    };

    useEffect(() => {
        setLoading(!loading)
    }, [sentSuccessfully]);


    useEffect(() => {
        if (!open) {
            setValue('amount', selectedAmount)
        }
    }, [selectedAmount])

    // if (failedSending) {
    //     return <div className="card">
    //         <div style={{ borderRadius: '200px', height: '100px', width: '200px', margin: '0 auto' }}>
    //             <i className="checkmark success">x</i>
    //         </div>
    //         <h1 className='success'>Success</h1>
    //         <p className='success'>Thank You!<br /> your Support token has been sent!</p>
    //     </div>;
    // }


    return (
        <>
            {
                !sentSuccessfully ? <div className={styles.donationForm}>

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
                            className={`${styles.amountButton} ${open ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                            onClick={() => { setOpen(!open) }}
                        >
                            Custom Amount
                        </button>
                        {(
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {open && <input  {...register("amount")} type="text" id="amount" name="amount" placeholder="TRX 1"></input>}

                                {loading ? <input type="submit" value="Submit" ></input> : <div style={{ display: 'flex', justifyContent: 'center' }} > <div class="loader"></div></div>}


                            </form>
                        )}
                    </div>}
                    <WalletActionButton className={styles.tronConnectBtn}></WalletActionButton>

                    <p style={{ color: '#fff' }}>SUP V 0.03 / 2023 &copy; Loktioncode Clubhouse</p>
                </div> :

                    <div className="card">
                        <div style={{ borderRadius: '200px', height: '100px', width: '200px', margin: '0 auto' }}>
                            <i className="checkmark success">✓</i>
                        </div>
                        <h1 className='success'>Success</h1>
                        <p className='success'>Thank You!<br /> your Support token has been sent!</p>
                    </div>

            }
        </>

    );
}

export default DonationForm;
