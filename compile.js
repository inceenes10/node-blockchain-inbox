import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";
import solc from "solc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");

const source = fs.readFileSync(inboxPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "Inbox.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

const compiledCode = solc.compile(JSON.stringify(input));
let output = JSON.parse(compiledCode);

const abi = output["contracts"]["Inbox.sol"]["Inbox"].abi;
const bytecode = output["contracts"]["Inbox.sol"]["Inbox"].evm.bytecode.object;

export default {
    interface: abi,
    bytecode,
};
