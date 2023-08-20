import React, { useState, useEffect } from 'react';
import '../Page3/AccountPage.css';
import ProfileImage from './ProfileImage.png';

let Selectedcategory = JSON.parse(localStorage.getItem('storedNames'));
let profileDetails = JSON.parse(localStorage.getItem('formData'));

//sending the selected box names
function Categorytext() {
  return Selectedcategory.map((elm) => {
    return (
      <div className="Categorytext" key={Selectedcategory.indexOf(elm)}>
        {elm}
      </div>
    );
  });
}

//exports function
function Account() {
  const [icon, setIcon] = useState(null);
  const [News, setnews] = useState(null);
  //calling weather Api

  useEffect(() => {
    const url =
      'https://api.openweathermap.org/data/2.5/weather?lat=12.973111&lon=77.585677&appid=1e25d35247669a468d173cd98f2dd82f&units=metric';

    const fetchWeatherIcon = async () => {
      try {
        let res = await fetch(url);
        let data = await res.json();
        //   let weatherIcon = data.weather[0].icon;
        console.log(data);
        setIcon(() => {
          return data;
        });
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchWeatherIcon();

    //Calling news api
    let RandomNumber = Math.floor(Math.random() * 100) + 1;
    // console.log(RandomNumber);
    let NewsApi =
      'https://newsapi.org/v2/everything?q=tesla&from=2023-07-20&sortBy=publishedAt&apiKey=281de765aa6944a3b86daac44c9632b4';

    let NewsApiFunction = async () => {
      try {
        let res = await fetch(NewsApi);
        let data = await res.json();
        //collecting News array
        let datArray = data.articles[RandomNumber];
        // console.log(datArray);
        setnews(() => {
          return datArray;
        });
      } catch {
        console.log('Error');
      }
    };

    NewsApiFunction();
  }, []);

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }

  return (
    <div className="PG3Container">
      <div className="Profile--Weather--Part">
        <div className="Only--profile">
          <img src={ProfileImage} alt="ProfileImage" />
          <div className="details--AND--categories">
            <p>{profileDetails.Name}</p>
            <p className='UserEmail'>{profileDetails.Email}</p>
            <p className="User--Name">{profileDetails.UserName}</p>
            {Categorytext()}
          </div>
        </div>
        <div className="Only--Weather">
          <div className="Times--area">
            <span>{`${day}-${month}-${year}`}</span>
            <span>{`${hours}:${minutes} ${amPm}`}</span>
          </div>
          <div className="All--weather--details">
            <div>
              <p>
                {icon && (
                  <img
                    src={`http://openweathermap.org/img/w/${icon.weather[0].icon}.png`}
                    alt=""
                  />
                )}
              </p>
              <p className="weather--condition">
                {icon && `${icon.weather[0].main}`}
              </p>
            </div>
            <p className='Weather--divider'></p>
            <div className="celcius--div">
              <p className="Celcius--text">
                {icon && `${Math.floor(icon.main.temp)}`} °C
              </p>

              <div className="PreContainer">
                <div className="temp--div">
                  <i class="fa-solid fa-temperature-half"></i>
                </div>
                <div className="mbar--div">
                  {icon && `${icon.main.pressure}`} mbar
                  <p>Pressure</p>
                </div>
              </div>
            </div>
            <p className='Weather--divider'></p>

            <div className="Wind--container">
              <div className="wrapping--windLogo--text">
                <div>
                  <span class="material-symbols-outlined">air</span>
                </div>
                <div>
                  <p>
                    <span>{icon && `${icon.wind.speed}`} km/h</span>
                    <p>wind</p>
                  </p>
                </div>
              </div>
              <div className="wrapping--windLogo--text">
                <div>
                  <span class="material-symbols-outlined">humidity_mid</span>
                </div>
                <div className='Humidity--container'>
                  <p>
                    <span> {icon && `${icon.main.humidity}`} %</span>
                    <p>Humidity</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="News--Part">
        <div className="newsImage--dates">
          {News && <img src={News.urlToImage} alt="newsImage" />}
          <p className="Mountain--And--date">
            <h3>{News && News.title}</h3>
            <span>
              <span>{`${day}-${month}-${year}`}</span>
              <span className="separateStick">|</span>
              <span>{`${hours}:${minutes} ${amPm}`}</span>
            </span>
          </p>
        </div>
        <p className="News--text">
          {News && News.description}
        </p>
      </div>
    </div>
  );
}

export default Account;
