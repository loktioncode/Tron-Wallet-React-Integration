import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './donationForm.module.css';

function DonationForm() {
    const { register, handleSubmit, errors, watch, setValue } = useForm();
    const [selectedAmount, setSelectedAmount] = useState('10');

    const onSubmit = (data) => {
        console.log(data);
        // Perform any additional actions such as submitting the data to a server
    };

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
    };

    useEffect(()=>{
        if (selectedAmount !== 'custom') {
            setValue('amount', selectedAmount)
        }
    }, [selectedAmount])

    const showCustomAmount = selectedAmount === 'custom';

    return (
        <div className={styles.donationForm}>
            <div className="flex flex-wrap justify-between mb-4">
                <button
                    className={`${styles.amountButton} ${selectedAmount === '10' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('10')}
                >
                    $10
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '25' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('25')}
                >
                    $25
                </button>
                <button
                    className={`${styles.amountButton} ${selectedAmount === '50' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('50')}
                >
                    $50
                </button>

                <button
                    className={`${styles.amountButton} ${selectedAmount === 'custom' ? styles.amountButtonSelected : styles.amountButtonDeSelected}`}
                    onClick={() => handleAmountSelection('custom')}
                >
                    Custom Amount
                </button>

                { (
                <form onSubmit={handleSubmit(onSubmit)}>
                   
                   {showCustomAmount  && <input  {...register("amount")} onChange={(e) => setAmount(e.target.value)} type="text" id="lname" name="lastname" placeholder="Your last name.."></input>}

                    <input type="submit" value="Submit" ></input>
                </form>
            )}
            </div>

        
        </div>
    );
}

export default DonationForm;
