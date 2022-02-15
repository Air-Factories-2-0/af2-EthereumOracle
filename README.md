# 1° oracle-onchain

### Install
-npm install

-npm install -g truffle

-npm install -D truffle-plugin-verify

### Modifiche da fare prima del compile
{.env}

-Sostituire MNEMONIC con quella personale del wallet

{Oracle.sol}

-Inserire dentro address l'address del wallet


### Compile
-truffle compile

-truffle migrate --reset --network rinkeby

### Verificare il contratto su (https://rinkeby.etherscan.io/)
-truffle run verify Oracle@0xe8b52748ffE7006c5460CC7e8A2dd17fb38b7006 --network rinkeby 

(Sostituire 0xe8b52748ffE7006c5460CC7e8A2dd17fb38b7006 con l'address del proprio contratto)


# 2° oracle-off-chain

### Install
-npm install

-npm install web3

### Modifiche
{.env}

-Sostituire la PK con la private key del wallet

### src/config.mjs
-Address: inserire l'address del contratto dell'oracolo

-Abi: inserire l'abi dopo che il contratto è stato verificato (prenderla da etherscan)

### Compile
Run start dal package.json