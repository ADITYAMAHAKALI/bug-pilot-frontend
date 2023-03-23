import React from 'react'
import './bugs.css'
const Bugs = ({bugs,handleEdit,handleDelete}) => {
  return (
    <table className="bugs">
            <thead>
                <tr>
                    <th>bug Id</th>
                    <th>bug Title</th>
                    <th>bug Author</th>
                    <th>bug Label</th>
                    <th>bug Status</th>
                    <th>Edit Bug</th>
                    <th>Delete Bug</th>
                </tr>
            </thead>
            <tbody>
                {bugs && bugs.map((bug) =>{
                    return (<tr className="bug" key={bug.bugId}>
                            <td>{bug.bugId}</td>
                            <td>{bug.bugTitle}</td>
                            <td>{bug.bugAuthor}</td>
                            <td>{bug.bugLabel}</td>
                            <td>{bug.open===true ? "open" : "closed"}</td>
                            <td><button id="edit" onClick={()=> handleEdit(bug.bugId)}> 📝 Edit</button></td>
                            <td><button id="delete" onClick={()=>handleDelete(bug.bugId)}>🗑️ Delete</button></td>
                         </tr>);
                })}
            </tbody>
           
        </table>
  )
}

export default Bugs