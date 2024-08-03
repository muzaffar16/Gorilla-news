import React from 'react';
import Card from './Card';

const Home = ({ news, paginate, totalNews, newsPerPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='home'>
      {
        news && news.map(element => {
          return (
            <Card key={element.url}
              title={element.title}
              content={element.content}
              author={element.author}
              publishedAt={element.publishedAt}
              url={element.url}
              urlToImage={element.urlToImage}
              altImage={"/bbc.png"}
            />
          )
        })
      }
      <div className='pagination'>
        {pageNumbers.map(number => (
          <span key={number} className='page-item' onClick={() => paginate(number)}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
