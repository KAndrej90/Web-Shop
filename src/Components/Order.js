import React from "react";
import {useNavigate} from "react-router-dom";

export default function Order({basketItems, resetBasket}) {

	let navigate = useNavigate();

  return (
    <div className='order-container'>
			<h1> Your order is on your way:</h1>
			{basketItems.map((item)=>
					<div key={item.id}>
						<h3>{item.name}</h3>
						<img src={item.img} alt={item.name}></img>
						<span> {item.quantity} x {item.price} €</span>	
						<hr></hr>
					</div>
			)}	
			<button onClick={()=>{
				navigate('/') 
				resetBasket()
			}}>Shop more</button>
		</div>
  );
};