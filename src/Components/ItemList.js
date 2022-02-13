import React from "react";
import Item from "./Item";

export default function ItemList({data,onAdd}) {

  return (
    <>
      <div className='card-list'>
      {data.map((item)=>
          <Item key={item.id} itemDetails={item} onAdd={onAdd}/> 
      )}
      </div>
    </>
  );
}