"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const matches = fs_1.default.readFileSync("football.csv", {
    encoding: 'utf8'
});
const splitMatches = matches.split("\n");
const mapMatches = splitMatches.map(function (row) {
    return row.split(",");
});
let manUnitedWins = 0;
for (let match of mapMatches) {
    if (match[1] === 'Man United' && match[5] === 'H') {
        manUnitedWins++;
    }
    else if (match[2] === 'Man United' && match[5] === 'A') {
        manUnitedWins++;
    }
}
;
console.log(`Man United won ${manUnitedWins} games!`);
