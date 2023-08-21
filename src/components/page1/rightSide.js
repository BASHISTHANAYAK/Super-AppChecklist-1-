import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function RightSide() {
   const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Name: '',
    UserName: '',
    Email: '',
    Number: '',
  });
  const [validation, setValidation] = useState({
    Name: false,
    UserName: false,
    Email: false,
    Number: false,
    CheckBox: false,
  });

  //state for check box
  const [checkBox, setCheckBox] = useState(false);

  //inputs onChange function
  function BoxInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    setInputs(function (preValue) {
      return { ...preValue, [name]: value };
    });
    setValidation(function (preValue) {
      return { ...preValue, [name]: false };
    });
  }

  //checkBox onClick function
  function ClkCheckBox() {
    setCheckBox(function (pre) {
      return !pre;
    });
  }

  //Form submit function
  function SubmitForm(event) {
    event.preventDefault();
   
    //checking conditions
    if (
      inputs.Name.length >= 1 &&
      inputs.UserName.length >= 1 &&
      inputs.Email.length >= 1 &&
      inputs.Number.length >= 1 &&
      checkBox === true
    ) {
      console.log(
        inputs.Name,
        inputs.UserName,
        inputs.Email,
        inputs.Number,
        ' check box clicked'
      );
      setValidation(function (preValue) {
        return { ...preValue, CheckBox: false };
      });

      //  local storage
      const formData = {
        Name: inputs.Name,
        UserName: inputs.UserName,
        Email: inputs.Email,
        Number: inputs.Number,
      };

      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/ChoosePage');
     
    } else {
      if (inputs.Name.length < 1) {
        console.log('empty Name');
        setValidation(function (preValue) {
          return { ...preValue, Name: true };
        });
      }
      if (inputs.UserName.length < 1) {
        console.log('empty UserName');
        setValidation(function (preValue) {
          return { ...preValue, UserName: true };
        });
      }
      if (inputs.Email.length < 1) {
        console.log('empty Email');
        setValidation(function (preValue) {
          return { ...preValue, Email: true };
        });
      }
      if (inputs.Number.length < 1) {
        console.log('empty Number');
        setValidation(function (preValue) {
          return { ...preValue, Number: true };
        });
      }
      if (checkBox === false) {
        console.log('check box not clicked');
        setValidation(function (preValue) {
          return { ...preValue, CheckBox: true };
        });
      }
    }
  }
  return (
    <div>
      <h3 className="super--h3">Super app</h3>
      <p className="errorMessage">Create your new account</p>
      <form action="" onSubmit={SubmitForm}>
        <input
          type="text"
          placeholder="Name"
          name="Name"
          value={inputs.Name}
          onInput={(event) => BoxInput(event)}
          state={validation.Name}
        />
        {validation.Name && <p className="errorMessage">Field is required</p>}

        <input
          type="text"
          placeholder="UserName"
          name="UserName"
          value={inputs.UserName}
          onChange={(event) => BoxInput(event)}
        />
        {validation.UserName && (
          <p className="errorMessage">Field is required</p>
        )}

        <input
          type="email"
          placeholder="Email"
          name="Email"
          value={inputs.Email}
          onChange={(event) => BoxInput(event)}
        />
        {validation.Email && <p className="errorMessage">Field is required</p>}

        <input
          type="number"
          placeholder="Number"
          name="Number"
          value={inputs.Number}
          onChange={(event) => BoxInput(event)}
        />
        {validation.Number && <p className="errorMessage">Field is required</p>}

        <input
          type="checkbox"
          className="checkBox"
          name="checkBox"
          value={checkBox}
          onClick={ClkCheckBox}
        />
        <span className="chekBox--text">
          Share my registration data with Superapp
        </span>
        {validation.CheckBox && (
          <p className="errorMessage">Check this box if you want to proceed</p>
        )}

        <input type="submit" className="submit" />
      </form>
      <p className="TandC">
        By clicking on Sign up. you agree to Superapp
        <span>Terms and Conditions of Use</span>
      </p>
      <p className="policy">
        To learn more about how Superapp collects, uses, shares and protects
        your personal data please head Superapp
        <span>Privacy Policy</span>
      </p>
    </div>
  );
}
export default RightSide;
