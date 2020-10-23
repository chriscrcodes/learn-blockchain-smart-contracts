const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const senderAddress = 'YOUR_SENDER_ADDRESS';

const gas = 1500000;
const gasPrice = 1000000;

const fs = require('fs');
const Web3 = require('web3');
const abi = JSON.parse(fs.readFileSync('./build/Voting_sol_Voting.abi').toString());

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
let contract = new web3.eth.Contract(abi, contractAddress);

console.log('Get current votes');
contract.methods.getVotes.call({ // Get current votes, should return an empty array
    from: senderAddress
    }).then(function(result){
        console.log(result);
    });

console.log('Add Candidate1');
contract.methods.addOption("Candidate1").send({ // Add Candidate1
        from: senderAddress,
        gas: gas,
        gasPrice: gasPrice,
    }).then(function(result){
        console.log(result);
    });

console.log('Add Candidate2');
contract.methods.addOption("Candidate2").send({ // Add Candidate2
        from: senderAddress,
        gas: gas,
        gasPrice: gasPrice,
    }).then(function(result){
        console.log(result);
    });

console.log('Add Candidate3');
contract.methods.addOption("Candidate3").send({ // Add Candidate3
    from: senderAddress,
    gas: gas,
    gasPrice: gasPrice,
    }).then(function(result){
        console.log(result);
    });

console.log('Start Voting');
contract.methods.startVoting().send({ // Start Voting
    from: senderAddress,
    gas: gas,
    gasPrice: gasPrice,
    }).then(function(result){
        console.log(result);
    });

console.log('Vote for Candidate2');
contract.methods.vote(1).send({ // Vote for Candidate2 (index 1 in options array, index start from 0)
    from: senderAddress,
    gas: gas,
    gasPrice: gasPrice,
    }).then(function(result){
        console.log(result);
    });

console.log('Get current votes');
contract.methods.getVotes.call({ // Get current votes, should return one vote for Candidate2
    }).then(function(result){
        console.log(result);
    });