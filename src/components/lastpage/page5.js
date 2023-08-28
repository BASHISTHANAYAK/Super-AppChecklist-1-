import React, { useState, useEffect } from 'react';
import '../lastpage/page5.css';
import ProfileRoundImage from './Roundprofile.png';
import { useNavigate } from 'react-router-dom';

function Lastpage() {
  const Navigate = useNavigate();
  //Selected catogry Array from the local storage.
  const selectedNames = JSON.parse(localStorage.getItem('storedNames'));
  const [imageArrays, setImageArrays] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Getting movies according to our selected category from Movie Api.
  useEffect(() => {
    if (selectedNames && selectedNames.length >= 1) {
      async function fetchMoviesByType(movietype) {
        const apiKey = 'b8042e25';
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${movietype}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          const arrayOfOBJ = data.Search || [];
          // Returning Movie array
          return arrayOfOBJ;
        } catch (error) {
          console.log('Error fetching data:', error);
          return [];
        }
      }

      async function fetchData() {
        const results = [];
        // Wating for response and pusin gin a new array.
        for (const name of selectedNames) {
          const movies = await fetchMoviesByType(name);
          results.push({ categoryName: name, movies });
        }

        setImageArrays(results);
        setLoading(false); // Set loading to false after fetching
      }

      fetchData();
    }
  }, [selectedNames]);

  // Redirecting to ChoosePage
  function LastPageBrowse() {
    Navigate('/ChoosePage');
  }

  return (
    <div className="main--container">
      <div className="Txt--profile">
        <h3 className="SuperApp--text">Super app</h3>
        <p>
          <img src={ProfileRoundImage} alt="" />
        </p>
      </div>
      <h3 className="Entertainment">Entertainment according to your choice</h3>

      {selectedNames && selectedNames.length > 0 ? (
        loading ? (
          <div className='lastPage--loading--div'>
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
              alt="LoadingImage"
              srcset=""
              className=""
            />
            <p>Loading please Wait...</p>
          </div>
        ) : (
          imageArrays.map(({ categoryName, movies }) => (
            <div key={categoryName} className="All--div">
              <p className="selectedcategory--text">{categoryName}</p>
              <div className="Four--Image--Div">
                {movies
                  .filter(
                    (movie) => movie.Type === 'movie' && movie.Poster !== 'N/A'
                  )
                  .slice(0, 4)
                  .map((movie) => (
                    <div className="Img-Div" key={movie.imdbID}>
                      <img src={movie.Poster} alt="" />
                    </div>
                  ))}
              </div>
            </div>
          ))
        )
      ) : (
        <p>Minimum 3 category required</p>
      )}

      <button className="Browse--Button" onClick={LastPageBrowse}>
        Browse
      </button>
    </div>
  );
}

export default Lastpage;
