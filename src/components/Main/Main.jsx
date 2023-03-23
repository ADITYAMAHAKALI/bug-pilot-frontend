import React, { useEffect,useState } from 'react'
import './main.css'
import Bugs from '../bugs/Bugs'
import AddBug from '../AddBug/AddBug'
import EditBug from '../EditBug/EditBug'
const Main = () => {
    const [bugs, setBugs] = useState([])
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
    const [bug,setBug] = useState({})

    async function fetchBugs(){
        const response =  (await fetch('http://localhost:9090/api/bug/'))
        const data = await response.json()
        setBugs(data)
    }

    async function fetchBug(bugId){
        const response =  (await fetch(`http://localhost:9090/api/bug/${bugId}`))
        console.log('response', response)
        const data = await (await response.json())
        console.log('data', data)
        setBug(data)
    }

      useEffect(()=>{
        fetchBugs()
        //console.log(bugs)
      },[]);

    const showAdd = () => {
        setAdd(!add)

        if(edit ===true)
        setEdit(!edit)
    }

    const handleEdit =  (bugId) => {
        setEdit(!edit)
        fetchBug(bugId)

        fetchBugs()
    }

    const handleDelete = async (bugId) => {
        console.log('bugId' , bugId)
        console.log(`http://localhost:9090/api/bug/`+{bugId})
        const response = await fetch(`http://localhost:9090/api/bug/`+bugId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    // as for this method only a message string is returnet, so we don't need to parse it
    const data = await response;
    console.log(data);
    alert(`bug with id ${bugId} deleted.`);
    fetchBugs()
    }
    
  return (  
    <main>
        <div className="search">
            <input type="text" placeholder='🔎 Search By bugId, bugTitle' />
            <button onClick={()=>{showAdd()}}>Add Bug</button>
        </div>
        {edit===true && <EditBug  bug={bug}/>}
        {add===true && <AddBug setAdd={setAdd}/>}
        {add!==true && edit!==true && <Bugs bugs={bugs} handleEdit={handleEdit} handleDelete={handleDelete}/>}
    </main>
  )
}

export default Main