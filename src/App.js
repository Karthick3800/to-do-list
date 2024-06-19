import { useEffect, useState } from "react";

// to get local item from local storage
function getlocalitems()
{
  let list=localStorage.getItem('Todo');
  // console.log(list);
  if(list)
    return JSON.parse(localStorage.getItem('Todo'));
  else
  {
    return [];
  }
}
// const initialItems = getlocalitems();

export default function App()
{
const [items,setItems]=useState(getlocalitems());

function AddItems(item){
setItems((items)=>[...items,item]);
}

function handleDeleteItem(id)
{
  setItems(items=>items.filter(item=>item.id!==id))
}
function handleToggle(id)
{
  setItems(items=>items.map(item=>item.id===id?{...item,completed:!item.completed}:item))
}
function handleReset()
{
  if(!items.length) return ;
  const confirm=window.confirm("Are you sure you want to clear all Todo ?")
  if(confirm)setItems([]);
}
useEffect(()=>{localStorage.setItem('Todo',JSON.stringify(items))},[items]);
return (
  <div className="app">
    <Logo/>
    <Form  addItems={AddItems}/>
    <Todo items={items} handleDeleteItem={handleDeleteItem} onToggleItem={handleToggle} handleReset={handleReset}/>
    <Stats items={items}/>
  </div>
);

}

function Logo()
{
return <h1 className="logo"> To-do List</h1>
}
function Form({addItems})
{
  const[description,setDescription]=useState("");
  function handlesubmit(e)
  {
     e.preventDefault();
    //  console.log(e);
     if(!description)return ;
     
     const newItem={description,completed:false,id:Date.now()};

     console.log(newItem);
     addItems(newItem);
     setDescription("");
    //  initialItems.push(newtodo);
  }
return( 
<form className="add-form" onSubmit={handlesubmit}>

<h3>What are you Going to do</h3>

<input type="text" placeholder="Enter here" value={description} onChange={(e)=>setDescription(e.target.value)}/>
<input type="submit" value="Add" name="add"/>
</form>
);
}
function Todo({handleDeleteItem,items,onToggleItem,handleReset})
{
  return (
    
   <div className="list">
  <ul>
    {
      items.map((item)=>(
      <Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} onToggleItem={onToggleItem}/>
    ))
    }
  </ul>
    <button onClick={handleReset}>Reset</button>
   </div>
  )
}
function Item({ item ,handleDeleteItem,onToggleItem})
{
  return (<li className="todo">
    <input type="checkbox" value={item.checked} onChange={()=>onToggleItem(item.id)}/>
    <span style={item.completed ? {textDecoration:"line-through"}:{}}>
       {item.description}
      </span>
  <button onClick={()=>handleDeleteItem(item.id)}>❌</button>
  </li>
  );
}
function Stats({items})
{
  
  if(!items.length) return (<p  className="stats"><em>Add some tasks to get started!</em></p>)
const numItem=items.length;
  const numCompleted=items.filter((item)=>item.completed).length;
  const percentage=Math.round((numCompleted/numItem)*100);
return( 
<footer className="stats">
 <em> {percentage===100?`Congratulations! You have completed all your tasks! 🎉`:`You have ${numItem} work , and you already done ${numCompleted} (${percentage}%)`}</em>

</footer>
);
}


