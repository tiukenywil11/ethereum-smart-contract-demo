// import from web3 noode module
import Web3 from "web3";

window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum);

/* temporarily commented out web3GetAccounts function call
const web3GetAccounts = async () => {
    const web3Accounts = await Web3.eth.getAccounts();
    console.log(web3Accounts);  
}

web3GetAccounts(); 
*/ 

export default web3;