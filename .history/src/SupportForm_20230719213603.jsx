import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './donationForm.module.css';

function DonationForm() {
    const { register, handleSubmit, errors, watch, setValue } = useForm();
    const [selectedAmount, setSelectedAmount] = useState('1');

    const onSubmit = (data) => {
        console.log(data);
        // Perform any additional actions such as submitting the data to a server
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

    async function sendTRC20Token(network, fromAddress, toAddress, amount, privateKey, AppKey, CONTRACT) {
        let url = null;
        if (network === "shasta") {
            url = "https://api.shasta.trongrid.io";
        } else if (network === "nile") {
            url = "https://nile.trongrid.io";
        } else {
            url = "https://api.trongrid.io";
        }
        const tronWeb = new TronWeb({
            fullHost: url,
            headers: { "TRON-PRO-API-KEY": AppKey },
            privateKey: privateKey,
        });
        const options = {
            feeLimit: 10000000,
            callValue: 0
        };
        const tx = await tronWeb.transactionBuilder.triggerSmartContract(
            CONTRACT, 'transfer(address,uint256)', options,
            [{
                type: 'address',
                value: toAddress
            }, {
                type: 'uint256',
                value: amount * 1000000
            }],
            tronWeb.address.toHex(fromAddress)
        );
        const signedTx = await tronWeb.trx.sign(tx.transaction);
        const broadcastTx = await tronWeb.trx.sendRawTransaction(signedTx);
        return broadcastTx;
    }

  const sendTxn = async () => {
    const fromAddress = "TL.....";
    const toAddress = "TN.....";
    const amount = 1.2;
    const privateKey = "key";
    const AppKey = "Tron Pro API Key - Optional";
    const usdt_contract = "USDT contract see below";
    const network = "shasta, nile or main";
    await sendTRC20Token(network, fromAddress, toAddress, amount, privateKey, AppKey, usdt_contract);
}
  }

    return (
        <div className={styles.donationForm}>
            <h2 className='text-head'>ENTER TRX AMOUNT TO SUPPORT CREATOR</h2>
            <div className="flex flex-wrap justify-between mb-4">
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
            </div>

            <p style={{ color: '#fff' }}>SUP V 0.03 / 2023 &copy; Loktioncode Clubhouse</p>
        </div>
    );
}

export default DonationForm;
