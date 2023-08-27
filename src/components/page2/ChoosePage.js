import React, { useState, useEffect, useCallback } from 'react';
import data from './categoryData';
import './ChoosePage.css';
import requiredSign from '../Images/requiredSign.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(data);
  const [storeName, setStoreName] = useState([]);

  const updateImageData = useCallback(() => {
    const storedNames = JSON.parse(localStorage.getItem('storedNames')) || [];
    setStoreName(storedNames);

    // Update box values based on stored names
    const updatedImageData = imageData.map((item) => ({
      ...item,
      value: storedNames.includes(item.BoxName),
    }));
    setImageData(updatedImageData);
  }, [imageData]);

  useEffect(() => {
    //removing array when page refresh
    localStorage.removeItem('storedNames');
    updateImageData();
  }, []);

  // Clicking img boxes function
  function ClickImgBox(id, BoxName) {
    setImageData((predata) => {
      const updatedData = predata.map((item) => {
        if (id === item.Id) {
          return { ...item, value: !item.value };
        }
        return item;
      });
      return updatedData;
    });

    let updatedStoreName;
    if (!storeName.includes(BoxName)) {
      updatedStoreName = [...storeName, BoxName];
    } else {
      updatedStoreName = storeName.filter((name) => name !== BoxName);
    }
    setStoreName(updatedStoreName);
    localStorage.setItem('storedNames', JSON.stringify(updatedStoreName));
  }

  // Clicking the cross (X) to remove box name
  function ClickCross(boxName) {
    const updatedStoreName = storeName.filter((name) => name !== boxName);
    setStoreName(updatedStoreName);
    localStorage.setItem('storedNames', JSON.stringify(updatedStoreName));

    // Reset the box value to false when removing a box name
    setImageData((prevData) =>
      prevData.map((item) =>
        item.BoxName === boxName ? { ...item, value: false } : item
      )
    );
  }

  // Sending Box Names on screen
  function selectedItem() {
    return storeName.map(function (names) {
      return (
        <div className="BoxName--div" key={names}>
          {names}
          <span className="cross--x" onClick={() => ClickCross(names)}>
            X
          </span>
        </div>
      );
    });
  }

  // Generating boxes by mapping on data
  function BOX() {
    return imageData.map((elm) => (
      <div
        key={elm.Id}
        className="Individual--ImgBox"
        onClick={() => ClickImgBox(elm.Id, elm.BoxName)}
        //changing  BorderColor color  as we click
        style={{ borderColor: elm.value ? 'green' : 'transparent' }}
      >
        <img src={elm.BoxImage} alt={elm.BoxName} />
      </div>
    ));
  }

  // Next page button
  function NextPage() {
    if (storeName.length >= 3) {
      navigate('/AcccountPage');
    } else {
      alert('Select minimum 3 category');
    }
  }

  return (
    <>
      <div className="Welcome--container">
        <div className="choosePart--text">
          <h3>Super app</h3>
          <h2>Choose your entertainment category</h2>
          {selectedItem()}
          <p className="requied--sign">
            <span>
              <img src={requiredSign} alt="" />
            </span>
            <span>Minimum 3 category required</span>
          </p>
        </div>
        <div className="BoxesPart">
          <div className="All--images--container"> {BOX()} </div>
          <button className="Nxt--button" onClick={NextPage}>
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
