import { useState } from 'react'
import web3 from '../config/web3';
import lottery from '../smart-contract/lottery';

function Form() {

    const [ ether, setEther ] = useState('')

    const onChange = e => {
        setEther(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const accounts = await web3.eth.getAccounts();

        // call method enter to send to the lottery contract
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei( ether, 'ether')
        })
    }

    return (
        <>
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
        </form>
        <button>Enter</button>
        </>
    )
}

export default Form