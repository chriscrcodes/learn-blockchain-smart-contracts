var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "YOUR_MNEMONIC";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/YOUR_KEY");
      },
      network_id: 4
    }    
  },

  mocha: {
  },

  compilers: {
    solc: {
      // version: "0.5.0"
    }
  }
}