# Exercise 2: compile your Smart Contract using Solidity compiler locally with Start Visual Studio Code

- Create your Smart Contract "Voting"
- Compile using Solidity compiler locally
- Deploy to your local Blockchain
- Interact with your contract

## Contract Creation

## Start Visual Studio Code

### Create a folder named "Exercise2" and move to this folder

### Create a new file "Voting.sol" with the following content

```javascript
pragma solidity ^0.5.0;

contract Voting {

    struct OptionPos {
        uint pos;
        bool exists;
    }

    uint[] public votes;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) posOfOption;
    string[] public options;
    bool votingStarted;

    function addOption(string memory option) public {
        require(!votingStarted, "Voting has already started");
        options.push(option);
    }

    function startVoting() public {
        require(!votingStarted, "Voting has already started");
        votes.length = options.length;

        for (uint i = 0; i < options.length; i++) {
            OptionPos memory option = OptionPos(i, true);
            posOfOption[options[i]] = option;
        }
        votingStarted = true;
    }

    function vote(uint option) public {
        require(0 <= option && option < options.length, "Invalid option");
        require(!hasVoted[msg.sender], "Account has already voted");

        hasVoted[msg.sender] = true;
        votes[option] = votes[option] + 1;
    }

    function vote(string memory option) public {
        require(!hasVoted[msg.sender], "Account has already voted");
        OptionPos memory optionPos = posOfOption[option];
        require(optionPos.exists, "Option does not exist");

        hasVoted[msg.sender] = true;
        votes[optionPos.pos] = votes[optionPos.pos] + 1;
    }

    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}
```

## Contract Compilation

### Compile Smart Contract Bytecode and Application Binary Interface (ABI)

In a new terminal, move to the folder where the Voting.sol Smart Contract is located, and type

```cmd
solcjs --bin --abi Voting.sol -o build
```

It will compile your Smart Contract and create Bytecode and Application Binary Interface (ABI) in the "build" folder.  
Look at these files: ABI is a JSON file describing Smart Contract methods, BIN is the ByteCode.

### Create a folder named "contracts" and move the "Voting.sol" file to this folder

## Contract Deployment

### Start a local test Ethereum Blockchain instance

Run Ganache (UI version, from Start Menu), and click on "Quickstart".

A local test Ethereum Blockchain instance will be created, with 10 personal accounts and their associated private key.

By default, the RPC server will listen on [http://127.0.0.1:7545](http://127.0.0.1:7545)

The number of blocks is 0 when starting Ganache (current block).

### Deploy the Smart Contract to your local Blockchain

### Install web3 Node package

In a new terminal, move to the root folder of your project (Exercise2), and type

```cmd
npm install solc web3
```

### Copy content of file "deploy.js" from GitHub

[deploy.js](deploy.js)

### Create "deploy.js" script file from content copied

```cmd
node deploy.js
```

If everything went well, a contract address will be displayed.  
Note the contract address and the sender address.

You should now see in Ganache that a block has been created, with one transaction corresponding to the Smart Contract creation.

## Contract Interaction

### Type the following commands in Node to interact with your Smart Contract

In a new terminal, move to the root folder of your project (Exercise2), and type

```cmd
node
```

### **Adapt the first two lines:**

```javascript
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const senderAddress = 'YOUR_SENDER_ADDRESS';
```

Then copy/paste the lines below:

```javascript
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
```

The last line should return :

```javascript
[ BigNumber { _hex: '0x00' },
  BigNumber { _hex: '0x01' },
  BigNumber { _hex: '0x00' } ]
```

[Let's jump to Exercise 3 !](../Exercise3/Exercise3.md)
