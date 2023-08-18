import React from "react";
let arr =JSON.parse(localStorage.getItem('storedNames'));
console.log(arr);
function Account(){

   return <h1>My account</h1>
}

export default Account;