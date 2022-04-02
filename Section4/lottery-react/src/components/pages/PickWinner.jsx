import { useState } from 'react'
import web3 from '../config/web3';
import lottery from '../smart-contract/lottery';

function PickWinner({manager}) {

    const [ message, setMessage ] = useState('');

    const onClick = async () => {

        // get accounts
        const accounts = await web3.eth.getAccounts();

        setMessage('Waiting on transaction success...');

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        setMessage('A winner has been picked!');
    }

    return (
    <>
        <hr/>
        <h4> Ready to pick a winner?</h4>
        <button
            onClick={onClick}    
        > 
            Pick a Winner! 
        </button>
        <hr/>
        <h2>{message}</h2>
    </>
    )
}

export default PickWinner