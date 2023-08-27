import React, { useState, useEffect } from 'react';
import '../Page3/AccountPage.css';
import ProfileImage from '../Images/ProfileImage.png';
import Alarmpart from '../alarm/AlarmPart';
import { useNavigate } from 'react-router-dom';

function Account() {
  let Navigate = useNavigate();
  const [icon, setIcon] = useState(null);
  const [News, setNews] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [amPm, setAmPm] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  let Selectedcategory = JSON.parse(localStorage.getItem('storedNames'));
  let profileDetails = JSON.parse(localStorage.getItem('formData'));

  //returning selected Categorytext Buttons
  function Categorytext() {
    return Selectedcategory.map((elm) => {
      return (
        <div className="Categorytext" key={Selectedcategory.indexOf(elm)}>
          {elm}
        </div>
      );
    });
  }

  // Accessing system longitude & latitude from system.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }

    // Getting weather from weather api
    const fetchWeatherData = async () => {
      if (latitude !== null && longitude !== null) {
        const apiKey = '1e25d35247669a468d173cd98f2dd82f';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          setIcon(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeatherData();

    //Getting news from news api .
    const fetchNewsData = async () => {
      try {
        let NewsApi =
          'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5bd0e4fdf5d64d48a4c2ef85d7ed6cb9';
        let res = await fetch(NewsApi);
        let data = await res.json();
        let RandomNumber = Math.floor(Math.random() * 10) + 1;
        console.log(RandomNumber);
        console.log(data);
        let datArray = data.articles[RandomNumber];
        console.log(datArray);
        setNews(datArray);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();

    //Time update as per conditions
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let amPm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      setAmPm(amPm);
      setHours(hours);
      setMinutes(minutes);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, [latitude, longitude]);

  //Saving text areea inputs in local storage
  function TxtArea(event) {
    let TextAreaInputs = event.target.value;
    localStorage.setItem('TextAreaInputs', TextAreaInputs);
  }

  //Click Browse button to go to Next page
  function GoToLastPage() {
    Navigate('/Lastpage');
  }

  //Getting current Date
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return (
    <div className="PG3Container">
      <div className="full--left--part">
        <div className="Pr--we--notes--parent">
          <div className="Profile--Weather--Part">
            {/* Profile details part */}
            <div className="Only--profile">
              <img src={ProfileImage} alt="ProfileImage" />
              <div className="details--AND--categories">
                {profileDetails ? (
                  <>
                    <p>{profileDetails.Name}</p>
                    <p className="UserEmail">{profileDetails.Email}</p>
                    <p className="User--Name">{profileDetails.UserName}</p>
                    {Categorytext()}
                  </>
                ) : (
                  <p>Loading profile details...</p>
                )}
              </div>
            </div>
            {/* Weather information part */}
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
                <p className="Weather--divider"></p>
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
                <p className="Weather--divider"></p>

                <div className="Wind--container">
                  <div className="wrapping--windLogo--text">
                    <div>
                      <span className="material-symbols-outlined">air</span>
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
                      <span className="material-symbols-outlined">
                        humidity_mid
                      </span>
                    </div>
                    <div className="Humidity--container">
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
          {/* textarea Part */}
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            onChange={TxtArea}
          ></textarea>
        </div>

        {/* ************************************************************* */}

        <div className="alarm">
          <Alarmpart />
        </div>
      </div>
      {/* Weather part  */}
      <div className="News--Part">
        <div className="newsImage--dates">
          {News ? (
            <img src={News.urlToImage} alt="newsImage" />
          ) : (
            <img
              src="https://ideateandexecute.com/wp-content/uploads/2013/10/Loading_icon.gif"
              alt="newsImage"
            />
          )}
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
          {News ? News.description : 'Loading News details...'}
        </p>
      </div>
      {/* Browse button */}
      <div className="browse--Button" onClick={GoToLastPage}>
        Browse
      </div>
    </div>
  );
}

export default Account;
