import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './donationForm.module.css';

function DonationForm() {
    const { register, handleSubmit, errors } = useForm();
    const [selectedAmount, setSelectedAmount] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
        // Perform any additional actions such as submitting the data to a server
    };

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
    };

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
            </div>

            {(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label for="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."></input>

                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Donate
                            </button>
                        </div>
                </form>
            )}
        </div>
    );
}

export default DonationForm;
