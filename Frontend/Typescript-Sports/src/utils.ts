export enum MatchResult {
    HomeWin = 'H',
    AwayWin = 'A',
    Draw = 'D'
};

export type MatchData = [Date, string, string, number, number, MatchResult, string];


export function dateStringToDate(dateString: string): Date {
    const dateParts = dateString.split('/');
    const dateMap = dateParts.map(function (value: string) {
        return parseInt(value);
    });

    return new Date(dateMap[2], dateMap[1] - 1, dateMap[0]);
};