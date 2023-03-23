import React from 'react'

const Bugs = ({bugs}) => {
  return (
    <table className="bugs">
            <thead>
                <tr>
                    <th>bug Id</th>
                    <th>bug Title</th>
                    <th>bug Author</th>
                    <th>bug Label</th>
                    <th>bug Status</th>
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
                         </tr>);
                })}
            </tbody>
           
        </table>
  )
}

export default Bugs