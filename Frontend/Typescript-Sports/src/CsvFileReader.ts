import fs from 'fs';

class CsvFileReader {
    data: string[][] = []; //This is an array of arrays.

    constructor(public filename: string) { }

    read(): void {
        const fileContent: string = fs.readFileSync(this.filename, { encoding: 'utf-8' });
        const splitMatches: string[] = fileContent.split("\n");
        const parsedData: string[][] = splitMatches.map(function (row: string): string[] {
            return row.split(",");
        });

        this.data = parsedData;     
    }
}

export { CsvFileReader };