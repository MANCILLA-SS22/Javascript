import { WinsAnalysis } from "./analyzers/WinsAnalysis";
import { HtmlReport } from "./reportTargets/HtmlRpoert";
import { MatchData } from "./utils";

interface Analyzer{
    run(marches: MatchData[]): string;
}

interface OutputTarget {
    print(report: string): void;
}

class Summary{
    static winsAnalysisWithHtmlReport(team: string): Summary{
        return new Summary(new WinsAnalysis(team), new HtmlReport());
    };

    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget){}

    buildAndPrintReport(matches: MatchData[]): void{
        const output = this.analyzer.run(matches);
        this.outputTarget.print(output);
    }
};

export {Analyzer, OutputTarget, Summary};