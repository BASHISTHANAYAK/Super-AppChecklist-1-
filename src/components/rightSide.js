import React from 'react';

function rightSide() {

function SubmitForm(){
    console.log('hi');
}


  return (
    <div>
      <h3 className="super--h3">Super app</h3>
      <p className="errorMessage">Create your new account</p>
      <form action="" onClick={SubmitForm}>

        <input type="text" placeholder="Name" />
        <p className="errorMessage">Field is required</p>

        <input type="text" placeholder="UserName" />
        <p className="errorMessage">Field is required</p>

        <input type="email" placeholder="Email" />
        <p className="errorMessage">Field is required</p>

        <input type="number" placeholder="Number" />
        <p className="errorMessage">Field is required</p>

        <input type="checkbox" className="checkBox" />
        <span className="chekBox--text">
          Share my registration data with Superapp
        </span>
        <p className="errorMessage">Check this box if you want to proceed</p>
        
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
export default rightSide;
