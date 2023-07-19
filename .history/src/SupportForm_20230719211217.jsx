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

    return (
        <div className={styles.donationForm}>
            <h2 className='text-head'>ENTER TRX AMOUNT TO SUPPORT CREATOR</h2>
            <div className="flex flex-wrap justify-between mb-4">
                <button
                    className={`${styles.amountButton} ${selectedAmount === '10' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('10')}
                >
                    TRX 20
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '25' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('25')}
                >
                    TRX 50
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '50' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('50')}
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
