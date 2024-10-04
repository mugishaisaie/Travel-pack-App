import { useState } from "react";

const PackingList = ({items, handleDeleteItem,handleToggleItem,handleClearList})=>{

    const [sortBy, setSortBy] = useState('input');
  
    let sortedItems;
    if(sortBy === 'input') sortedItems = items;
    if(sortBy === 'description') sortedItems = items.slice().sort((a,b)=>(a.description.localeCompare(b.description)));
    if(sortBy === 'packed') sortedItems = items.slice().sort((a,b)=>Number(b.packed - a.packed));
  
   
    
    
    return <div className="list">
      <ul>
      {sortedItems.map((item)=> <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem}/>)}
    </ul>
  
    <div className='actions'>
      <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
        <option value="input">Sort By Input</option>
        <option value="description">Sort By Description</option>
        <option value="packed">Sort By Packed Status</option>
      </select>
  
      <button className='btn' onClick={handleClearList}>Clear List</button>
  
    </div>
    </div>
  }

  export default PackingList;