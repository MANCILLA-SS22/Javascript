//Using SQL-lite
import sql from 'better-sqlite3';
const db = sql('data.db');

async function getAllNews() {
  const news = db.prepare('SELECT * FROM news').all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

async function getNewsItem(slug) {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

async function getLatestNews() {
  const latestNews = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

async function getAvailableNewsYears() {
  const years = db.prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news").all().map((year) => year.year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
}

function getAvailableNewsMonths(year) {
  return db.prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?").all(year).map((month) => month.month);
}

async function getNewsForYear(year) {
  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export { getAllNews, getNewsItem, getLatestNews, getAvailableNewsYears, getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth };

/* Without using SQL
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
 */