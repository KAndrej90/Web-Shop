import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Basket({basketItems,onAdd,onRemove,handleSumPrice}) {
	let navigate = useNavigate();
	let off20 = 0.2;
	let off5= 0.05;
	let off20Eur= 20;
	const className = basketItems[0] ? 'total-price' : 'hiden';
	
	const [isChecked20, setIsChecked20] = useState(false);
	const [isChecked5, setIsChecked5] = useState(false);
	const [isChecked20EUR, setIsChecked20EUR] = useState(false);

	let sumPrice = basketItems.reduce ((a, currentItem) => a + (currentItem.price * currentItem.quantity - currentItem.discount), 0);
	let initialSum = sumPrice;

	
	const handleOnChange20 = () => {
    setIsChecked20 (!isChecked20);
  };

	const handleOnChange5 = () => {
    setIsChecked5(!isChecked5);		
  };

	const handleOnChange20EUR = () => {
    setIsChecked20EUR(!isChecked20EUR);
	}
  const submitSumPrice=()=>{
	handleSumPrice(sumPrice);
};


	if(sumPrice > 0) {
		if(isChecked20){
			sumPrice = sumPrice - (sumPrice * off20);			
		}	
		if(isChecked5 && !isChecked20EUR){
			sumPrice = sumPrice - (sumPrice * off5);
		}	
		if(isChecked20EUR && sumPrice > off20Eur){
			sumPrice = sumPrice - off20Eur;
		}
		if(isChecked20EUR && isChecked5  && sumPrice > off20Eur){
			initialSum = initialSum - off20Eur;
			sumPrice = initialSum - (initialSum * off5);
		}
		if (isChecked20EUR && isChecked5 && sumPrice < off20Eur){
		sumPrice = sumPrice - (sumPrice * off5);
		}
	}



	return (
		<div className='basket-container'>
			<div className='basket'>
				<div className='empty-basket'>{basketItems.length === 0 && <h1>Your Basket Is Empty</h1>}</div>	
				{basketItems.map ((item)=>
					<div key={item.id} className='basket-item'>
						<img src={item.img} alt={item.name}></img>

						<div className='basket-item-description'>
						<h4>{item.name}</h4>
						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula 
							eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
							nascetur ridiculus mus. Donec quam felis, ultricies nec, </p>
						</div>

						<div className='basket-item-btns'>
							<button type='button' onClick={()=>onAdd(item)}>+</button>
							<button type='button'onClick={()=>onRemove(item)}>-</button>
						</div>

						<div className='basket-item-price'>
							<p>{item.quantity} x {item.price.toFixed(2)} €</p>
						</div>
					</div>
				)}
			</div>
			
			<div className={className}>
				<div className='price-card'>
					<form>
						<div>
							<label htmlFor='off20'>20OFF</label>
							<input type='checkbox' id="off20" onChange={handleOnChange20} disabled={isChecked5 || isChecked20EUR}></input>
							<p> 20% off final cost - cannot be used in conjunction with other codes</p>
						</div>
						<div>
							<label htmlFor='off05'>5OFF </label>
							<input type='checkbox' id="off05" onChange={handleOnChange5} disabled={isChecked20} className='five-off'></input>
							<p> 5% off final cost - can be used in conjunction with other codes</p>
						</div>
						<div>
							<label htmlFor='20Eur'>20EUR </label>
							<input type='checkbox' id='20Eur' onChange={handleOnChange20EUR} disabled={isChecked20 &&  sumPrice > off20Eur}></input>
							<p>- 20EUR off final cost - can be used in conjunction with other codes</p>
						</div>
					</form>
					<hr></hr>
					<h3>Total price: {sumPrice.toFixed(2)} €</h3>
					<div className='checkout-btn'>
						<button onClick={()=>{
								submitSumPrice() 
								navigate('/checkout')}}
								> Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
