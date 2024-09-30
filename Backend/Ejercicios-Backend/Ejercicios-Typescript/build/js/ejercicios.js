"use strict";
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Primitives %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch('https://jsonplaceholder.typicode.com/users');
            return yield data.json();
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
            return []; //The function does not return anything in the catch block, which might lead to undefined behavior. You can return an empty array or some other fallback value in case of failure. In case of an error, it returns an empty array instead of undefined.
        }
    });
}
function fetchAndLogUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield fetchUsers();
            console.log(users);
        }
        catch (err) {
            console.error('Error fetching users:', err);
        }
    });
}
fetchAndLogUsers();
