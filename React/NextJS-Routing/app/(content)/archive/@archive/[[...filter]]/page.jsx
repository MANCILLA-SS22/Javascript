import Link from 'next/link';
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';
import NewsList from '@/components/news-list';

export default function FilteredNewsPage({ params }) {
    const id = params.filter;
    const selectedYear = id?.[0]; // --> id ? id[0] : undefined;
    const selectedMonth = id?.[1]; // --> id ? id[1] : undefined;
    let news;
    let links = getAvailableNewsYears();
    let newsContent = <p>No news found for the selected period!</p>

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear)
    } 
    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    } 
    if (news && news.length > 0) newsContent = <NewsList news={news} />;
    if (selectedYear && !getAvailableNewsYears().includes(+selectedYear) || selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth) ) throw new Error("Invalid filter");

    console.log("id --> ", id);
    console.log("selectedYear --> ", selectedYear);
    console.log("selectedMonth --> ", selectedMonth);
    console.log("news --> ", news);
    console.log("links --> ", links);

    return <>
        <header id="archive-header">
            <nav>
                <ul>
                    {
                        links.map(function (link) {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
                            console.log("href --> ", href);
                            return <>
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            </>
                        })
                    }
                </ul>
            </nav>
        </header>
        {newsContent}
    </>
}

// [[...filter]] will make sure that this page.jsx will be activated for any path segments after "archive". No matter how many segments we have there and no matter how they're named.