import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Basket({basketItems,onAdd,onRemove,handleSumPrice}) {
	let navigate = useNavigate();
	let off20 = 0.2;
	let off5= 0.05;
	let off20Eur= 20;
	let a='20%OFF';
	let b ='5%OFF';
	let c ='20EUROFF';
	const className = basketItems[0] ? 'total-price' : 'hiden';
	
	// const [isChecked20, setIsChecked20] = useState(false);
	// const [isChecked5, setIsChecked5] = useState(false);
	// const [isChecked20EUR, setIsChecked20EUR] = useState(false);

	const [isChecked20, setIsChecked20] = useState(false);
	const [isChecked5, setIsChecked5] = useState(false);
	const [isChecked20EUR, setIsChecked20EUR] = useState(false);
	const [couponName,setCouponName] = useState ('')


	let sumPrice = basketItems.reduce ((a, currentItem) => a + (currentItem.price * currentItem.quantity - currentItem.discount), 0);
	let initialSum = sumPrice;

	console.log('on load ' + couponName);

	const changeCoupon =(e)=>{
		 setCouponName  (e.target.value);
		 console.log(couponName)
	};

const applyCoupon =()=>{

	if(couponName === '20%OFF'){
		if(isChecked20EUR===false && isChecked5 === false){
		setIsChecked20 (true);
		setCouponName('');
		}	 
		else {alert('This promo code cannot be used in conjuction with other codes')
		setCouponName('')
		};
		return;
	};
	if(couponName === '5%OFF'){
		if(isChecked20===false){
			setIsChecked5 (true);
			setCouponName('');
		} 
		else {alert('Usage of promo code 20%OFF cannot be used in conjuction with other codes')
		setCouponName('')
		};
		return;
	};
	if(couponName === '20EUROFF'){	
		if(isChecked20===false){
			setIsChecked20EUR (true);
			setCouponName('');
		}	
		else {alert('Usage of promo code 20%OFF cannot be used in conjuction with other codes')
		setCouponName('')
		};
		return;
	}
	else  {
	setCouponName('');
	alert('Invalid coupon name');
	};
};

 const removeCoupon20 =()=>{
	 setIsChecked20(false)
 };

 const removeCoupon5 =()=>{
	setIsChecked5(false)
	};

	const removeCoupon20EUR =()=>{
	setIsChecked20EUR(false)
	};

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
	};
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
						<div className='coupon-btns'>
						<input value={couponName} onChange={changeCoupon}></input>
							<button type="button"  className='add-coupon-btn' onClick={applyCoupon}> Add coupon</button>
							{ isChecked20 && 
								<div>
								<span>20%OFF</span>
								<button type="button" className='coupon-btn' onClick={removeCoupon20}> x </button>
								</div>}
							{ isChecked5 && <div>
								<span>5%OFF</span>
								<button type="button" className='coupon-btn' onClick={removeCoupon5}> x </button>
							</div>}
							{ isChecked20EUR && 
								<div>
								<span>20EUROFF</span>
								<button type="button" className='coupon-btn' onClick={removeCoupon20EUR}> x </button>
								</div>}
						</div>
						<p>20%OFF - 20% of final cost - cannot be used in conjunction with other codes</p>
						<p>5%OFF - 5 % of final cost - can be used in conjunction with other codes</p>
						<p>20EUROFF -20 EUR of final cost - can be used in conjunction with other codes</p>
					</form>
					<hr></hr>
					<div className='checkout-div'>
					<h3>Total price: {sumPrice.toFixed(2)} €</h3>
					
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
