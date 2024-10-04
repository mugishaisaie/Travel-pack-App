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

  export default Stats;

// in App.jsx