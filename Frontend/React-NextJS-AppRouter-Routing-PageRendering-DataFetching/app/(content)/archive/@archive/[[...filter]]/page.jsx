//Using Suspense
import Link from 'next/link';
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';
import NewsList from '@/components/news-list';
import { Suspense } from 'react';

async function FilterHeader({ year, month }){
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

    if (year && !availableYears.includes(year) || month && !getAvailableNewsMonths(year).includes(month)) throw new Error("Invalid filter");
    if (year && !month) links = getAvailableNewsMonths(year);
    if (year && month) links = [];

    return <>
        <header id="archive-header">
            <nav>
                <ul>
                    {
                        links.map(function (link) {
                            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
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
    </>
}

async function FilteredNews({year, month}){
    let news;
    let newsContent = <p>No news found for the selected period!</p>

    if (year && !month){
        news = await getNewsForYear(year);
    }else if(year && month){
        news = await getNewsForYearAndMonth(year, month);
    }
    if (news && news.length > 0) newsContent = <NewsList news={news} />;

    return newsContent;
}

async function FilteredNewsPage({ params }) {
    const id = params.filter;
    const selectedYear = id?.[0]; // --> id ? id[0] : undefined;
    const selectedMonth = id?.[1]; // --> id ? id[1] : undefined;

    return <>
        <Suspense fallback={<p>Loading header...</p>}>
            <FilterHeader year={selectedYear} month={selectedMonth} />
        </Suspense>
        <Suspense fallback={<p>Loading news...</p>}>
            <FilteredNews year={selectedYear} month={selectedMonth}/>
        </Suspense>
    </>
};

export default FilteredNewsPage;

//We're not getting a loading feedback even though we have a parent loading.jsx. The reason for that is because when selecting a month we're already on that [[...filter]] page.jsx and therefore NextJS doesn't swap it
//for the loading fallback since we already have some data. We're just loading some new data, but we already did load data before so it's not showing us that loading feedback again.

//With it being wrapped around a component that fetches data, it will automatically register if that component is still fetching data and it allows us to show a fallback.
//And with that, we then have a very granular way of telling NextJS that a part of the JSX code should be replaced with a fallback if that part is fetching data. With loading.js, it's less granular. There we're 
//telling NextJS that an entire component, the entire page component actually should be replaced with that fallback if it's fetching data. But if we're then just re fetching data, it will not be replaced again.
//Finally, now we'll show different loading fallbacks for these different areas. And if they take different amounts of times to load, we'll show content as soon as it's ready because these two suspense boundaries 
//do not wait on each other. Instead, each boundary will show its data once it's there and show its fallback until it's there, but it does not wait for any other data in any other suspense wrapped component to load.

/* //Without using Suspense
import Link from 'next/link';
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';
import NewsList from '@/components/news-list';

async function FilteredNewsPage({ params }) {
    const id = params.filter;
    const selectedYear = id?.[0]; // --> id ? id[0] : undefined;
    const selectedMonth = id?.[1]; // --> id ? id[1] : undefined;
    let news;
    let links = await getAvailableNewsYears();
    let newsContent = <p>No news found for the selected period!</p>
    const availableYears = await getAvailableNewsYears();


    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear)
    } 
    if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    } 
    if (news && news.length > 0) newsContent = <NewsList news={news} />;
    if ( (selectedYear && !availableYears.includes(selectedYear)) || (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth)) ) throw new Error('Invalid filter.'); 


    return <>
        <header id="archive-header">
            <nav>
                <ul>
                    {
                        links.map(function (link) {
                            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
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
};

export default FilteredNewsPage; */