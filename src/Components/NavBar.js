import React from "react";
import{Link,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function NavBar({basketItems}) {
	let navigate = useNavigate();

  return (
    <nav>
			<Link to='/'><h1>Home</h1></Link>
				<div>
				<Link to='/basket'> <FontAwesomeIcon icon={faCartShopping} /></Link>
				{basketItems[0] ? (<button onClick={()=>navigate('/basket')}> {basketItems.length}</button>) : ('')}
			</div> 	
    </nav>
  );
}