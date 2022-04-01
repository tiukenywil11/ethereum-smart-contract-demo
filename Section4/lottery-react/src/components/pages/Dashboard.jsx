import { useState, useEffect } from 'react'
// import from web3 noode module
import Web3 from "web3";
// import smart contract local instance
import lottery from '../smart-contract/lottery'

function Dashboard() {

    const [manager, setManager] = useState('');
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState('');
    
    useEffect(() => 
    {
        const fetchContractDetails = async () => {
            // get values from smart contract
            const manager = await lottery.methods.manager().call();
            const players = await lottery.methods.getPlayers().call();
            const balance = await Web3.eth.getBalance(lottery.options.address);

            // set state to on react variables
            setManager(manager);
            setPlayers(players);
            setBalance(balance);
        }

        // call function to set async manager
        fetchContractDetails();
    },
    []
    )

    // web3.utils.fromWei converts balance value from wei to ether
    return (
    <div>
        <h2>Lottery Contract</h2>
        <p>
            This contract is managed by {manager}.
            There are currently {players.length} people entered,
            competing to win {Web3.utils.fromWei(balance, 'ether')} ether!
        </p>
    </div>
    )
}

export default Dashboard