import {expect} from 'chai';
import { createHash } from '../../src/utils/bcrypt.js';

const expect = expect();

describe('Test de la libreria bcrypt de Utils', function(){

    it("La funcion de encriptacion debe generar un password encriptado", async function () {
        // Given
        const passwordTest = "123qwe";

        // Then
        const result = await createHash(passwordTest);
        console.log(result);

        // Assert that
        expect(result).not.equal(passwordTest);
        expect(result).not.to.be.NaN;
        expect(result).not.to.be.undefined;
        expect(result).not.to.be.null;
        expect(result).not.to.be.empty;
    });
});

// se ejecuta con: npx mocha test/utils/bcrypt.chai.test.js