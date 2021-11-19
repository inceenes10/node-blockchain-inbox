import assert from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";
import compile from "../compile.js";

const web3 = new Web3(ganache.provider());

let accounts, inbox;

const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(compile.interface)
        .deploy({ data: compile.bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address);
    });

    it("has a default message", async () => {
        const message = await inbox.methods.message().call();

        assert.equal(message, INITIAL_STRING);
    });

    it("can change the message", async () => {
        await inbox.methods.setMessage("Hello World!").send({
            from: accounts[0],
        });

        const newMessage = await inbox.methods.message().call();

        assert.equal(newMessage, "Hello World!");
    });
});
