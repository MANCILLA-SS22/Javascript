import { CsvFileReader } from "./CsvFileReader";
import { MatchResult } from "../MatchResult";
import { dateStringToDate } from "../utils";

type MatchData = [Date, string, string, number, number, MatchResult, string];

class MatchReader extends CsvFileReader<MatchData>{
    mapRow(row: string[]): MatchData {
        return [
            dateStringToDate(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            row[5] as MatchResult, // 'H', 'A', 'D'
            row[6]
        ]
    }
};

export {MatchReader};