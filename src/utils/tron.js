import TronWeb from 'tronweb';
import toast, { Toaster } from 'react-hot-toast';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink';

const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', //https://api.trongrid.io
    headers: { 'TRON-PRO-API-KEY': '085ec0c1-d5bc-4dd2-b390-2316b3986697' },
});

export const onSend = async (receiver, amount) => {
    const adapter = new TronLinkAdapter();
    // connect
    await adapter.connect();

    // create a send TRX transaction
    const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx("TWmNkEBYwEDCnbhsJeak57WWCygZ8qSyW1" , amount, adapter.address).catch(err => toast.error(err));
    // using adapter to sign the transaction
    const signedTransaction = await adapter.signTransaction(unSignedTransaction);
    // broadcast the transaction
    await tronWeb.trx.sendRawTransaction(signedTransaction).then((res) => {
        toast.success("YAY!")
    }).catch(err => toast.error(err));
};


// Function to check if a Tron wallet address is valid
export function isValidTronAddress(address) {
    try {

        // tronWeb.address = address

        // If no error is thrown, the address is valid
        return true;
    } catch (error) {
        // If an error is thrown, the address is not valid
        return false;
    }
}

// Example usage
const walletAddress = 'TRX1234567890abcdef1234567890abcdef123456789'; // Replace this with the address you want to check

const isValid = isValidTronAddress(walletAddress);
console.log(`Is the wallet address valid? ${isValid}`);
