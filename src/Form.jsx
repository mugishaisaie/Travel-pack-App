import { useState } from "react";
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

  export default Form;