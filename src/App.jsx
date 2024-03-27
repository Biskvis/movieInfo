import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const url = 'https://api.themoviedb.org/3/search/movie';

function App() {
  const [movies, setMovies] = useState([])
  const [detail, setDetail] = useState({})
  const [search, setSearch] = useState({
    query: 'avenger',
    include_adult: false,
    language: 'en-US',
    page: 1,
  });

  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Axios.get(url, { params: search, headers })
        .then(response => {
          setMovies(response.data.results);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, 2000); 

    return () => clearTimeout(timeoutId);
  }, [search]); 


  function handleSearch(term) {
    setSearch(prevState => ({
      ...prevState,
      query: term,
    }));
  }

  const displayMovies = movies.map((item, index) =>
      <div key={index} className='p-8 flex flex-col justify-center items-center flex-shrink'>
        <img
        src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} 
        alt={item.original_title}
        className='cursor-pointer'
        onClick={() => setDetail(movies[index])} />
        <p className='text-xl text-center text-white cursor-pointer'>
          {item.original_title}
          </p>
      </div>
    )
  
  return (
    <>
      <h1 className='text-center font-bold text-4xl text-white mt-20'>Movie Info</h1>
      <div className='flex justify-center items-center p-8'>
        <input
          placeholder='Search movies'
          className='w-1/2 h-12 rounded-lg p-4'
          onChange={(e) => handleSearch(e.target.value)}
          value={search.query}
        />
      </div>
      {Object.keys(detail).length !== 0 ? (
        <div className='flex justify-center items-center p-4'>
          <img
          src={`https://image.tmdb.org/t/p/w300/${detail.poster_path}`} 
          alt={detail.original_title}
  
         />
         <div className='p-4'>

          <h1 className='text-center text-4xl  text-grey font-bold'>{detail.original_title}</h1>
          <p className='p-2'>Release Date: {detail.release_date}</p>
          <p className='p-2 text-xl max-w-96'>{detail.overview}</p>
          <button
           className='float-right bg-white text-black font-bold hover:bg-black hover:text-white p-6 rounded-full text-xl'
           onClick={() => setDetail({})}
           >Go back</button>
         </div>
        </div>
      ) : (
        <div className='grid grid-cols-4'>
          {movies.length > 0 && displayMovies}
        </div>
      )}

    </>
  );
}

export default App;
