import { DUMMY_NEWS } from '@/dummy-news';

function getAllNews() {
  return DUMMY_NEWS;
}

function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

function getAvailableNewsYears() {
  const res = DUMMY_NEWS.reduce(function (acc, curr) {
    const year = new Date(curr.date).getUTCFullYear();
    if (!acc.includes(year)) acc.push(year);
    return acc;
  }, []);
  return res.sort((a, b) => a - b);
}

function getAvailableNewsMonths(year) {
  const res = DUMMY_NEWS.reduce(function (acc, curr) {
    const newsYear = new Date(curr.date).getUTCFullYear();
    if (newsYear === +year) {
      const month = new Date(curr.date).getUTCMonth();
      if (!acc.includes(month)) acc.push(month + 1);
    }
    return acc;
  }, []);

  return res.sort((a, b) => a - b);
}

function getNewsForYear(year) {
  return DUMMY_NEWS.filter(news => new Date(news.date).getUTCFullYear() === +year);
}

function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter(function (news) {
    const newsYear = new Date(news.date).getUTCFullYear();
    const newsMonth = new Date(news.date).getUTCMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}

export { getAllNews, getLatestNews, getAvailableNewsYears, getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth };