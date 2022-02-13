import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Checkout({totalSum}) {

  let navigate = useNavigate();
  const [customer, setCustomer] = useState({email:'', adress:'', creditCard:''});

  const onSubmitForm=(e)=> {
    e.preventDefault();
  };
  const handleEmail = (e) => {
    setCustomer ({ ...customer, email: e.target.value })
  };

  const handleAdress = (e) => { 
    setCustomer ({ ...customer, adress: e.target.value })
  };

  const handleCreditCard = (e) => {
    setCustomer ({ ...customer, creditCard: e.target.value })
  };

  return (
    <div className='checkout-container'>
      <form onSubmit={onSubmitForm}>
          <h1>Checkout:</h1>
          <div>
            <label htmlFor='email'>E-mail*:</label>
            <input className='email' type='text' name='email' value={customer.email} id='email'placeholder=' e-mail' onChange={handleEmail} required autoComplete="off"></input>
          </div>
          <div>
            <label htmlFor='adress'>Adress*:</label>
            <input  type='text' name='adress' id='adress'placeholder=' adress' value={customer.adress} onChange={handleAdress} required autoComplete="off"></input>
          </div>
          <div>
            <label htmlFor='credit-card'>Credit card*:</label>
            <input  type='text' name='credit-card' id='credit-card'placeholder=' credit card' value={customer.creditCard} onChange={handleCreditCard} required autoComplete="off"></input>
          </div>
          {customer.email && customer.adress && customer.creditCard ? (<button type='button' onClick={()=>{navigate('/order')}}> Total to Pay: {totalSum} € </button>) : 
          <button className='alert-btn' onClick={()=>alert('Please fill out the required fields')}> Total to Pay: {totalSum} €</button>}
      </form>
    </div>
  );
};