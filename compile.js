import path from 'path';
import { fileURLToPath } from 'url';

import fs from "fs";
import solc from "solc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");

const source = fs.readFileSync(inboxPath, "utf8")
console.log(source);

function findImports(path) {
  if (path === 'lib.sol')
    return {
      contents:
        'library L { function f() internal returns (uint) { return 7; } }'
    };
  else return { error: 'File not found' };
}

const input = {
    language: "Solidity",
    sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

let output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);

console.log(output["contracts"]["Inbox.sol"]["Inbox"]);
