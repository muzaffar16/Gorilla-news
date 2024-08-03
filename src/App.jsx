import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(import.meta.env.VITE_DEFAULT_QUERY); // Ensure query has a default value
  const newsPerPage = 20;

  const filterNews = async (category = 'everything') => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    let link = '';
    if (category && category !== 'everything') {
      link = `${BASE_URL}/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`;
      console.log(link)
    } else {
      link = `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;
      console.log(link)
    }

    try {
      const { data } = await axios.get(link);
      if (data && data.articles) {
        setNews(data.articles);
      } else {
        setNews([]); // Set to empty array if no articles are found
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNews([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    filterNews(); // Optionally pass default category or query
  }, []);

  // Get current news for the page
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar filterNews={filterNews} />
      <Home news={currentNews} paginate={paginate} totalNews={news.length} newsPerPage={newsPerPage} />
      <Footer />
    </>
  );
}

export default App;
