const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const compilerInput = {
    language: "Solidity",
    sources: {
        'Voting': { content: fs.readFileSync('./contracts/Voting.sol', 'utf8') }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": [ "abi", "evm.bytecode" ]
        }
      }
    }
};

console.log('Compiling the contract');
const compiledContract = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

if(compiledContract.errors) {
    compiledContract.errors.forEach(err => console.log(err.formattedMessage));
}

const MyContract = compiledContract.contracts['Voting'].Voting;
const bytecode = '0x' + MyContract.evm.bytecode.object;
const abi = MyContract.abi;

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

contract = new web3.eth.Contract(JSON.parse(JSON.stringify(abi)), null, { data: bytecode } );

web3.eth.getGasPrice()
    .then((averageGasPrice) => {
        console.log("Average gas price: " + averageGasPrice);
        gasPrice = averageGasPrice;
    })
    .catch(console.error);

var gas;
contract.deploy().estimateGas()
    .then((estimatedGas) => {
        console.log("Estimated gas: " + estimatedGas);
        gas = estimatedGas;
    })
    .catch(console.error);

web3.eth.getAccounts()
    .then(accounts => {
        address = accounts[0];
        console.log("Contract will be deployed using account address: " + address);
        contract.deploy({
            data: bytecode
        })
        .send({
            from: address,
            gasPrice: 1000000,
            gas: gas
        })
        .on('error', (error) => {
          console.log(error)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(receipt);
            console.log("Contract address: " + receipt.contractAddress);
            console.log("Sender address: " + address);
            process.exit();
        })
    });