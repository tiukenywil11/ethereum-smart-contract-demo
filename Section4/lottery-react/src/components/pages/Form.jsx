import { useState } from 'react'
import web3 from '../config/web3';
import lottery from '../smart-contract/lottery';

function Form () {

    const [ ether, setEther ] = useState('');
    const [ message, setMessage ] = useState('');

    const onChange = (e) => {
        setEther(e.target.value);
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        // checks to see if transaction is ongoing
        setMessage('Waiting on transaction success...')

        const accounts = await web3.eth.getAccounts();


        // call method enter to send to the lottery contract
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei( ether, 'ether')
        });

        setMessage('You have been entered! ')
    }

    return (
        <>
        <hr/>
        <form onSubmit={onSubmit}>
            <h4> Want to try your luck? </h4>
            <div>
                <label> Amount of ether to enter </label>
                <input
                    type='text'
                    value={ether}
                    onChange={onChange}
                />
            </div>
            <button type='submit'>Enter</button>
        </form>
        <hr/>
        <h2>{message}</h2>
        </>
    )
}

export default Form