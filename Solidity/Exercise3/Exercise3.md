# Exercise 3: compile your Smart Contract using Truffle Suite

- Create your Truffle Project "Voting"
- Configure your Truffle Project environment
- Compile using Truffle
- Deploy using Truffle
- Test your contract

## Project Creation

### Create a folder named "Exercise3" and move to this folder

### Initialize Truffle Project

In a new terminal, move to the root folder of your project (Exercise3), and type

```cmd
truffle init
```

You should see:

```javascript
√ Preparing to download
√ Downloading
√ Cleaning up temporary files
√ Setting up box

Unbox successful. Sweet!

Commands:

  Compile:        truffle compile
  Migrate:        truffle migrate
  Test contracts: truffle test
```

### Explain file tree

- *contracts* folder where your contracts must reside
- *migrations* folder where your contracts migration files must reside
- *test* folder where your contracts unit tests must reside
- *truffle-config.js* Truffle configuration to connect to your Blockchain

## Configure your Truffle environment

### Edit truffle-config.js file as follows:

```javascript
module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      // version: "0.5.0"
    }
  }
}
```

### Copy your "Voting.sol" contract to the "contracts" directory

### Create a file named "2_deploy_contracts.js" in the "migrations" directory with the following content

```javascript
const Voting = artifacts.require('Voting');

module.exports = (deployer) => {
    deployer.deploy(Voting);
};
```

This file will be used to deploy the Smart Contract to your Blockchain.

## Contract Compilation

### Compile Smart Contract Bytecode and Application Binary Interface (ABI)

Type

```cmd
truffle compile
```

Truffle will compile your Smart Contract and create Bytecode and Application Binary Interface (ABI) in the "build" folder.  
The Bytecode and the ABI will be combined in one JSON file named "Voting.json", in "build/contracts" directory.

## Contract Deployment

Type

```cmd
truffle migrate --network ganache
```

Truffle will deploy the Smart Contract to the Blockchain instance defined in your "truffle-config.js" file, network "ganache".

If you want to restart a deployment from scratch, since Truffle will only migrate incremental changes, type the same command with the "--reset" option.

```cmd
truffle migrate --network ganache --reset
```

## Unit Tests

### Create a file named "TestVoting.js" in the "test" directory with the following content

```javascript
let Voting = artifacts.require('../contracts/Voting.sol');

contract('Voting', function(accounts) {

    let voter;
    let firstAccount;

    beforeEach(async function() {
        firstAccount = accounts[0];
        voter = await Voting.new();
        await setOptions(firstAccount, ['coffee', 'tea'])
    });

    it('has no votes by default', async function() {
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([0, 0]);
    });

    it('can vote with a string option', async function() {
        await voter.methods['vote(string)']('coffee', {from: firstAccount});
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    it('can vote with a number option', async function() {
        await voter.methods['vote(uint256)'](0, {from: firstAccount});
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    const ERROR_MSG = 'Returned error: VM Exception while processing transaction: revert Voting has already started -- Reason given: Voting has already started.';

    it('cannot vote twice from the same contract', async function() {
        try {
            let firstAccount = accounts[0];
            await setOptions(firstAccount, ['one', 'two'])

            await voter.methods['vote(uint256)'](0, {from: firstAccount});
            await voter.methods['vote(uint256)'](0, {from: firstAccount});
        } catch (error) {
            expect(error.message).to.equal(ERROR_MSG);
        }
    });

    async function setOptions(account, options) {
        for (pos in options) {
            await voter.addOption(options[pos], {from: account});
        }
        await voter.startVoting({from: account, gas: 600000});
    }

    function toNumbers(bigNumbers) {
        return bigNumbers.map(function(bigNumber) {
            return bigNumber.toNumber()
        })
    }
});
```

Run the tests with this command:

```javascript
truffle test --network ganache
```

You should see this:

```javascript
Contract: Voting
    √ has no votes by default (61ms)
    √ can vote with a string option (162ms)
    √ can vote with a number option (132ms)
    √ cannot vote twice from the same contract (103ms)


  4 passing (2s)
```

Congratulations!
