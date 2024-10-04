import { useState } from 'react'
// import './App.css'
import './index.css'


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem (newItem){
    setItems([...items, newItem])
  }

  const handleDeleteItem = (id)=>{
    console.log(id)
    setItems((items)=>items.filter((item)=>item.id !== id))
  }

  const handleToggleItem = (id)=>{
    setItems((items)=>items.map((item)=>item.id === id ? {...item, packed:!item.packed}: item))
  }

  function handleClearList(){
    setItems([])
    
  }


  return  (
    <div className='app'>
    <Logo />
  <Form handleAddItem={handleAddItem} />
    <PackingList items={items} handleDeleteItem={handleDeleteItem} 
    handleToggleItem={handleToggleItem} handleClearList={handleClearList}/>
    <Stats items={items} />
    </div>
  )
}

const Logo = ()=>{
  return (
    <h1>Go Away 💼</h1>
  )
}
const Form = ({handleAddItem})=>{

  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1)
 

  

  function handleSubmit(e){
    e.preventDefault();
    if(!description) return;

    const newItems = {
      quantity: quantity,
      description: description,
      packed: false,
      id: Date.now()

    }
    handleAddItem(newItems);

    setQuantity(1)
    setDescription('');


  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎trip?</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length: 30}, (_,i)=>(i+1)).map((num)=>(
          <option key={num}>{num}</option>
        ))}
      </select>
      <input type="text" name="" placeholder="Enter Item..." value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}
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

const Item = ({item, handleDeleteItem,handleToggleItem})=>{
  return <li>
    <input type="checkbox" value={item.packed} onChange={()=>handleToggleItem(item.id)}/>
    <span style={item.packed? {textDecoration: 'line-through'}: {} }>{item.quantity} {item.description}</span>
    <button onClick={()=>handleDeleteItem(item.id)}>❌</button>
  </li>
}
const Stats = ({items})=>{
  if(!items.length)return (
    <p className='stats'>
      <em>
        Start Adding SOme items to your Packing List 🚀
      </em>
    </p>
  )

  const numItems = items.length;
  const numPacked = items.filter((item)=>item.packed).length;

  const percentage = Math.round((numPacked / numItems) * 100);
  return <footer className='stats'>
  <em>
    {percentage === 100 ? "You Got everything Ready to Go✈️" :
    
       `👜You Have ${numItems} items on your list, and you already Packed ${numPacked} (${percentage}%) `
    }
    </em>
   
  </footer>
}

export default App
