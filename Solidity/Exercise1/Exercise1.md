# Exercise 1: create your first contract, compile with Remix Online IDE

- Create your first Smart Contract (store/display a single string value)
- Compile on Remix Online IDE

## Navigate to Solidity Online IDE

[Remix Solidity Online IDE](https://remix.ethereum.org)

In the "Run" tab, make sure that "JavaScript VM" is the selected environment.  

### Create a new file "Voting.sol" in Remix with the following content

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

### Compile Smart Contract

In the "Compile" tab, click on "Start to compile".  
If everything went well, a green "Voting" message should appear.

### Check Smart Contract informations

Click on "Details" to see the Bytecode, ABI and Web3 deploy informations.

### Deployment test

In the "Run" tab, select "JavaScript VM" as the Environment and click "Deploy".  
If everything went well, a "Voting" contract should appear in "Deployed contracts".

### Test the Smart Contract

- click on "addOption" dropdown icon, set "Candidate1" as option value in the "option" field and click on "transact"
- click on "addOption" dropdown icon, set "Candidate2" as option value in the "option" field and click on "transact"
- click on "addOption" dropdown icon, set "Candidate3" as option value in the "option" field and click on "transact"
- click on "startVoting" to allow users votes
- click on "vote" (string option) dropdown icon, set "Candidate2" as option value in the "option" field and click on "transact"
- click on "getVotes", should return

```javascript
0: uint256[]: 0,1,0
```

[Let's jump to Exercise 2 !](../Exercise2/Exercise2.md)
