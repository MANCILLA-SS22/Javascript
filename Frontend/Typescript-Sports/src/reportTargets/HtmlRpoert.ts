import fs from 'fs';
import { OutputTarget } from "../Summary";

class HtmlReport implements OutputTarget {
    print(report: string): void {
        const html = `
            <div>
                <h1>Analysis Output</h1>
                <div>${report}</div>
            </div>
        `;

        fs.writeFileSync("report.html", html);
    };
}

export {HtmlReport}