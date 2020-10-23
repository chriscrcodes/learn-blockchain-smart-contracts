# Solidity in Depth

[Solidity Documentation](https://solidity.readthedocs.io/en/latest/)

[Jump to Exercise 1](./Exercise1/Exercise1.md)

## Smart Contracts

- Has methods and fields
- Can have several instances
- Call methods to change state of a contract instance
- Methods and fields are static (non-dynamic)

## Smart Contract Structure

### Pragmas

The pragma keyword is used to enable certain compiler features or checks.  
Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes.  
A pragma directive is always local to a source file, so you have to add the pragma to all your files if you want enable it in all of your project.  
If you import another file, the pragma from that file does not automatically apply to the importing file.

```javascript
pragma solidity ^0.5.2;
```

A source file with the line above does not compile with a compiler earlier than version 0.5.2, and it also does not work on a compiler starting from version 0.6.0 (this second condition is added by using ^).  
This is because there will be no breaking changes until version 0.6.0, so you can always be sure that your code compiles the way you intended.  
The exact version of the compiler is not fixed, so that bugfix releases are still possible.  
It is possible to specify more complex rules for the compiler version, these follow the same syntax used by npm.

### Importing other Source Files

Solidity supports import statements to help modularise your code that are similar to those available in JavaScript (from ES6 on).  

At a global level, you can use import statements of the following form:

```javascript
import "filename" as symbolName;
```

### Comments

Single-line comments (//) and multi-line comments (/*...*/) are possible.

```javascript
// This is a single-line comment.

/*
This is a
multi-line comment.
*/
```

### Contract

Contracts in Solidity are similar to classes in object-oriented languages.  
Each contract can contain declarations of State Variables, Functions, Function Modifiers, Events, Struct Types and Enum Types.  
Furthermore, contracts can inherit from other contracts.

There are also special kinds of contracts called libraries and interfaces.

```javascript
contract Election {
    // ...
}
```

### Constructor

When a contract is created, its constructor (a function declared with the constructor keyword) is executed once.

A constructor is optional. Only one constructor is allowed, which means overloading is not supported.

After the constructor has executed, the final code of the contract is deployed to the blockchain. This code includes all public and external functions and all functions that are reachable from there through function calls.  
The deployed code does not include the constructor code or internal functions only called from the constructor.

```javascript
constructor() public {
    // ...
}
```

### Types

Solidity is a statically typed language, which means that the type of each variable (state and local) needs to be specified.  
Solidity provides several elementary types which can be combined to form complex types.

```javascript
bool flag; // true/false
int signedNum; // Signed 256 bit integer
uint unsignedNum; // Unsigned 256 bit integer
int8, int16, ... int256; // 8 to 256 bit signed ints
uint8, uint16, ... uint256; // 8 to 256 bit unsigned ints
string message; // String of characters
address userAddress; // Ethereum address
```

### Address

The address type comes in two flavours, which are largely identical:

address: Holds a 20 byte value (size of an Ethereum address).  
address payable: Same as address, but with the additional members transfer and send.

The idea behind this distinction is that address payable is an address you can send Ether to, while a plain address cannot be sent Ether.

### State Variables

State variables are variables whose values are permanently stored in contract storage.

```javascript
pragma solidity ^0.5.2;

contract Election {
    uint id; // State variable

    // ...
}
```

### Data location

Every reference type, i.e. arrays and structs, has an additional annotation, the “data location”, about where it is stored.  
There are three data locations: memory, storage and calldata.  
Calldata is only valid for parameters of external contract functions and is required for this type of parameter.  
Calldata is a non-modifiable, non-persistent area where function arguments are stored, and behaves mostly like memory.

```javascript
function f(uint[] memory memoryArray) public {
        // ...
}
```

### Constant State Variables

In Solidity, state variables can be declared as constant, so they have to be assigned using an expression that, at compile time, is a constant.

```javascript
pragma solidity ^0.5.2;

contract Election {
    uint constant MS_IN_SEC = 1000; // Constant

    // ...
}
```

### Enum Types

Enums can be used to create custom types with a finite set of "constant values".  

```javascript
pragma solidity ^0.5.2;

contract Election {
    enum State { Created, Locked, Inactive } // Enum

    // ...
}
```

### Struct Types

Structs are custom defined types that can group several variables.

```javascript
pragma solidity ^0.5.2;

contract Election {
    struct Candidate { // Struct
        uint id;
        string name;
        uint voteCount;
    }

    // ...
}
```

### Functions

Functions are the executable units of code within a contract.

```javascript
pragma solidity ^0.5.2;

contract Election {
    function vote () public { // Function
    }

    // ...
}
```

### Functions Modifiers

Function modifiers can be used to amend the semantics of functions in a declarative way.

```javascript
pragma solidity ^0.5.2;

contract Election {
    address public voter;

    modifier onlyVoter() { // Modifier
        require(
            msg.sender == voter,
            "Only voter can call this."
        );
        _;
    }

    function abort() public view onlyVoter { // Modifier usage
        // ...
    }

    // ...
}
```

### Arrays

Arrays can have a compile-time fixed size, or they can have a dynamic size.

```javascript
pragma solidity ^0.5.2;

contract Election {
    uint[] dynamic; // Empty array
    uint[5] arr5; // Array of length 5
    // ...
}
```

### Operators

```javascript
uint newVal = (a – b + c) * 2 / 4;
uint remainder = a % b;
uint power = a ** 3;
uint left = a << 2;
uint right = b >> 4;
num += 2; // num = num + 2;
num++;
```

### Comparison Operators

```javascript
bool larger = a > b;
bool smaller = a < b;
bool exp = (a >= b) && (a <= c);
bool exp2 = (a == b) || (a <= c);
```

### Encapsulation

Contracts are deployed on a public network.  

Anybody can call contracts' methods

- Methods can change a state of a contract

Need to specify what methods can be called from outside

- Similar to encapsulation in OO languages (e.g. Java, C#, etc.)

### Access Modifiers

```javascript
function onlyFromOutside() external {...}
function accessibleFromAnywhere() public {...}
function accessibleFromAnywhere() {...}
function accessibleInternaly() internal {...}
function accessibleInternaly() private {...}
```

### Field Modifiers

```javascript
uint public value; // Can be read from outside
uint internal value; // Can be accessed only from inside
uint private value; // Can be accessed only from inside
uint value; // Variables are private by default
```

### selfdestruct

Remove a contract using the "selfdestruct" method

- No more calls can be performed
- Costs negative gas!

Transaction history remains in blockchain.

```javascript
address beneficiary = 0x123;
// Sends funds to the beneficiary address
selfdestruct(beneficiary);
// Burns remaining funds if any
selfdestruct(0x0);
```
