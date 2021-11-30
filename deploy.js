// deploy code will go here
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import compile from "./compile.js";

const provider = new HDWalletProvider(
    "topple trial slice cup balance desert impulse pencil stool display adult puzzle",
    "https://rinkeby.infura.io/v3/4990f67c5b7845908c71c6bf72011dda"
);

const web3 = new Web3(provider);

(async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account:", accounts[0]);

    const result = await new web3.eth.Contract(compile.interface)
        .deploy({ data: compile.bytecode, arguments: ["Hi there!"] })
        .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to:", result.options.address);

    provider.engine.stop();
})();
