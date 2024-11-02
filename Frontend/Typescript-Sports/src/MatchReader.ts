import { CsvFileReader } from './CsvFileReader';
import { dateStringToDate } from './utils';
import { MatchResult } from './utils';
import { MatchData } from './utils';

interface DataReader {
    read(): void;
    data: string[][];
}

class MatchReader {
    static fromCsv(filename: string): MatchReader {
        return new MatchReader(new CsvFileReader(filename));
    }

    matches: MatchData[] = [];

    constructor(public reader: DataReader) { }

    load(): void {
        this.reader.read();
        this.matches = this.reader.data.map(function (row: string[]): MatchData {
            return [
                dateStringToDate(row[0]),
                row[1],
                row[2],
                parseInt(row[3]),
                parseInt(row[4]),
                row[5] as MatchResult, // 'H', 'A', 'D'
                row[6]
            ]
        });
    }
};

export { MatchReader };