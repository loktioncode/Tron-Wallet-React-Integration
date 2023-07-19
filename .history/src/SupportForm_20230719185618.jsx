import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function DonationForm() {
  const { register, handleSubmit, errors } = useForm();
  const [showCustomAmount, setShowCustomAmount] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Perform any additional actions such as submitting the data to a server
  };

  const handleAmountSelection = (amount) => {
    if (amount === 'custom') {
      setShowCustomAmount(true);
    } else {
      setShowCustomAmount(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-wrap justify-between mb-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
            !showCustomAmount ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleAmountSelection('10')}
        >
          $10
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
            !showCustomAmount ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleAmountSelection('25')}
        >
          $25
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
            !showCustomAmount ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleAmountSelection('50')}
        >
          $50
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
            !showCustomAmount ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleAmountSelection('100')}
        >
          $100
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ${
            showCustomAmount ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleAmountSelection('custom')}
        >
          Custom Amount
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`mb-4 ${showCustomAmount ? '' : 'hidden'}`}>
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder="Enter donation amount"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors?.amount ? 'border-red-500' : ''
            }`}
            ref={register({ required: true, pattern: /^[1-9]\d*$/ })}
          />
          {errors?.amount && (
            <p className="text-red-500 text-xs italic">Amount is required and must be a positive number</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonationForm;
