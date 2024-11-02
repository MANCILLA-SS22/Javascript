import fs from 'fs';

abstract class CsvFileReader<TypeOfData>{
    data: TypeOfData[] = []; //This is an array of arrays.

    abstract mapRow(row: string[]): TypeOfData;
    constructor(public filename: string) { }

    read(): void {
        const fileContent: string = fs.readFileSync(this.filename, { encoding: 'utf-8' });
        const splitMatches: string[] = fileContent.split("\n");
        const parsedData: string[][] = splitMatches.map(function (row: string): string[] {
            return row.split(",");
        });
        const mapedRow: TypeOfData[] = parsedData.map(this.mapRow);

        this.data = mapedRow;
    }

    
}

export { CsvFileReader };