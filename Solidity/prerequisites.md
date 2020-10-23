# Prerequisites for Solidity Smart Contract build/deployment on Windows

## NVM (Node Version Manager)

- install NVM from latest release: https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.zip
- start command prompt with admin rights

```
nvm install 10.16.0
nvm use 10.16.0
```

## Node Packages

From the same command prompt, type the following commands to install Node packages

```
npm install --global windows-build-tools --add-python-to-path="true"
npm install --global solc@0.5.8
npm install --global truffle@5.0.20
npm install --global ganache-cli@6.4.3
```

## Check installation status

### Solidity Compiler

```
solcjs --version
```

should return

```
0.5.8+commit.23d335f2.Emscripten.clang
```

### Truffle

```
truffle version
```

should return

```
Truffle v5.0.20 (core: 5.0.20)
Solidity v0.5.0 (solc-js)
Node v10.16.0
Web3.js v1.0.0-beta.37
```

## Solidity Compiler Version Manager (if needed)

- start command prompt with admin rights

```
git clone https://github.com/ConsenSys/solc-vm.git
cd solc-vm
npm install -g .
solc-vm install 0.5.8
```

## Check installation status for solc-vm

```
solc-vm ls
```

should return

```
0.5.8
0.5.9
```
