import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Checkout({totalSum}) {

  let navigate = useNavigate();
  const [customer, setCustomer] = useState({email:'', adress:'', creditCard:''});
  const [emailValidation, setEmailValidation] = useState(false);
  const [emailValidationMsg, setEmailValidatioMsg]=useState('');
  const [creditCardValidation, setCreditCardValidation]=useState(false);
  const [creditCardMsg, setCreditCardMsg] = useState('');

  const [adressValidation, setAdressValidation] = useState(false);
  const [adressMsg,setAdressMsg]= useState('');

  const onSubmit=(e)=> {
    e.preventDefault();
    console.log('submitano');
    
      if(!emailValidation){
        setEmailValidatioMsg('invalid e-mail adress');
      } else(setEmailValidatioMsg(''));

      if (!creditCardValidation){
        setCreditCardMsg('invalid credit card number');
      } else(setCreditCardMsg(''));

      if (!adressValidation){
        setAdressMsg('invalid adress');
      } else (setAdressMsg(''));
  };

  const handleEmail = (e) => {
    setCustomer ({ ...customer, email: e.target.value });
    setEmailValidation(false);
    const emailRegex = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){1,3}$/;
    if (emailRegex.test(customer.email)){
      setEmailValidation(true);
    }
  };

  const handleAdress = (e) => { 
    setCustomer ({ ...customer, adress: e.target.value });
    setAdressValidation(false);
    const adresRegex = /^\s*\S+(?:\s+\S+){1}/;
    if (adresRegex.test(customer.adress)){
      setAdressValidation(true);
    }
  };

  const handleCreditCard = (e) => {
    setCustomer ({ ...customer, creditCard: e.target.value });
    setCreditCardValidation(false);
    const cardregex = /\b(?:\d{4}[ -]?){3}(?=\d{3}\b)/gm;
    if (cardregex.test(customer.creditCard)){
      setCreditCardValidation(true);
    }
    ;
  };

  return (
    <div className='checkout-container'>
      <form onSubmit={onSubmit}>
          <h1>Checkout:</h1>
          <div>
            <label htmlFor='email'>E-mail*:</label>
            <input className='email' type='text' name='email' value={customer.email} id='email'placeholder=' e-mail' onChange={handleEmail} required autoComplete="off"></input>
            <p className="form-error-msg">{emailValidationMsg}</p>
          </div>
          <div>
            <label htmlFor='adress'>Adress*:</label>
            <input  type='text' name='adress' id='adress'placeholder=' adress' value={customer.adress} onChange={handleAdress} required autoComplete="off"></input>
            <p className="form-error-msg">{adressMsg}</p>
          </div>
          <div>
            <label htmlFor='credit-card'>Credit card*:</label>
            <input  type='text' name='credit-card' id='credit-card'placeholder=' enter your 16 digit number' value={customer.creditCard} onChange={handleCreditCard} required autoComplete="off"></input>
            <p className="form-error-msg">{creditCardMsg}</p>
          </div>
          {customer.email && customer.adress && customer.creditCard && emailValidation && creditCardValidation && adressValidation ? (<button type='button' onClick={()=>{
            navigate('/order')
            }}> Total to Pay: {totalSum} € </button>) : 
          <button type="submit" className='alert-btn' > Total to Pay: {totalSum} €</button>}
      </form>
    </div>
  );
};