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

let output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output["contracts"]["Inbox.sol"]["Inbox"]);
