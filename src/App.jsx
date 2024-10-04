import { useState } from 'react'
import './index.css'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Item from './Item'
import Stats from './Stats'


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
    const confirmed = confirm('Are you sure you want to Delete All Items?')
   if(confirmed) setItems([])
    
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


export default App
