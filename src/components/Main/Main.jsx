import React, { useEffect,useState } from 'react'
import './main.css'
import Bugs from '../bugs/Bugs'
import AddBug from '../AddBug/AddBug'
const Main = () => {
    const [bugs, setBugs] = useState([])
    const [add,setAdd] = useState(false)
    async function fetchBugs(){
        const response = await (await fetch('http://localhost:9090/api/bug/'))
        const data = await response.json()
        setBugs(data)
        console.log('data', data)
    }
      useEffect(()=>{
        fetchBugs()
        console.log(bugs)
      },[]);

    const showAdd = () => {
        setAdd(!add)
    }
    
  return (  
    <main>
        <div className="search">
            <input type="text" placeholder='🔎 Search By bugId, bugTitle' />
            <button onClick={()=>{showAdd()}}>Add Bug</button>
        </div>
        {add===true && <AddBug setAdd={setAdd}/>}
        {add!==true && <Bugs bugs={bugs}/>}
    </main>
  )
  
}

export default Main