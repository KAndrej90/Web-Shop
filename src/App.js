import './Style/style.css';
import {useState} from 'react';
import Basket from './Components/Basket';
import ItemList from './Components/ItemList';
import Checkout from './Components/Checkout';
import Order from './Components/Order';
import NavBar from './Components/NavBar';
import Error from './Components/Error';
import {Routes, Route} from 'react-router-dom';
import {items, quantityDiscounts} from './Data/Data';


export default function App() {

  const [data, setData] = useState(items);
  const [basketItems,setBasketItems]=useState([]);
  const [totalSum, setTotalSum]=useState('');

  const onAdd=(item)=>{
    const found = basketItems.find ((x)=>x.id === item.id);
    if(found) {
      let newQuantity = found.quantity + 1;
      let forDiscount = quantityDiscounts.find(x => x.id === found.id);
      let discount = 0;
      if(forDiscount && forDiscount.quantity <= newQuantity){
        discount = forDiscount.discount;
      };
      setBasketItems(
        basketItems.map((x)=>
        x.id === item.id ? {...found, quantity: newQuantity, discount: discount} : x
        )
      );
    }
    else {
      setBasketItems ([...basketItems, {...item, quantity: 1}]);
    }
  };


  const onRemove =(item)=>{
    const found = basketItems.find ((x)=>x.id === item.id);
    let forDiscount = quantityDiscounts.find (x => x.id === found.id);
    let newQuantity = found.quantity - 1;
    let discount = 0;
    if(forDiscount) {
      discount = forDiscount.discount;
      if(forDiscount && forDiscount.quantity > newQuantity){
       discount = 0; 
      };
    };

    if(found.quantity===1){
      setBasketItems(
        basketItems.filter((x)=>
        x.id !== item.id
        )
        );
    } else {
        setBasketItems(
          basketItems.map((x)=>
            x.id === item.id ? {...found, quantity: newQuantity, discount:discount} : x
          )
        );
      }
  };
  const handleSumPrice =(sumPrice)=>{
    setTotalSum(sumPrice.toFixed(2));
  };
  
  const resetBasket=()=>{
    setBasketItems([]);
  };

  return (
    <>
      <NavBar basketItems={basketItems}/>
      <Routes>
        <Route path='/' element={<ItemList data={data} onAdd={(item)=>onAdd(item)}/>}></Route>
        <Route path='/basket' element={ <Basket basketItems={basketItems} onAdd={(item)=>onAdd(item)} onRemove={(item)=>onRemove(item)} 
          handleSumPrice={(sumPrice)=>handleSumPrice(sumPrice)}/>}>
        </Route>
        <Route path='/checkout' element={<Checkout totalSum={totalSum}/>}></Route>
        <Route path='/order' element={<Order basketItems={basketItems} resetBasket={resetBasket}/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </>
  );
}
