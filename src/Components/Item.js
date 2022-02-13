import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function Item({itemDetails, onAdd}) {

  return (
   
    <div className='card'>
      <img src={itemDetails.img} alt={itemDetails.name}></img>
			<h4 className='product-name' >{itemDetails.name}</h4>
      <h4>Description</h4>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
        Donec quam felis, ultricies nec, </p>
			<hr></hr>
      <div>
        <h3>{itemDetails.price}€ </h3>
        <button onClick={()=>onAdd(itemDetails)}> <FontAwesomeIcon icon={faCartPlus} /></button>
      </div>
      <h4 className="on-sale">{itemDetails.offer}</h4>
    </div>
  );
}