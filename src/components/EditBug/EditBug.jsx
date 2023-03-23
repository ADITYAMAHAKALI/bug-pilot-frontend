import React, { useState,useEffect } from "react";
import "./editbug.css";

const EditBug = ({bug,setEdit}) => {
  const [bugTitle, setBugTitle] = useState('');
  const [bugAuthor, setBugAuthor] = useState('');
  const [bugLabel, setBugLabel] = useState('');
  const [bugStatus, setBugStatus] = useState('');
  useEffect(() => {
    console.log('bug', bug)
    console.log('bugTitle', bugTitle)
    console.log('bugStatus', bugStatus)
    setBugTitle(bug.bugTitle)
    setBugAuthor(bug.bugAuthor)
    setBugLabel(bug.bugLabel)
  },[bug])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:9090/api/bug/${bug.bugId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugTitle: bugTitle,
        bugAuthor: bugAuthor,
        bugLabel: bugLabel,
        bugStatus: bugStatus.toLowerCase().trim()==="open" ? true : false,
      }),
    });
    const data = await response;
    console.log(data);
    setEdit(false)
  }
  return (
    <>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <h3>Edit bug with id : {bug.bugId}</h3>
        <br />
        <input
          type="text"
          placeholder="Bug Title"
          onChange={(e) => setBugTitle(e.target.value)}
          value={bugTitle}
        />
        <input
          type="text"
          placeholder="Bug Author"
          value={bugAuthor}
          onChange={(e) => setBugAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bug Label"
          value={bugLabel}
          onChange={(e) => setBugLabel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bug status open or closed"
          value={bugStatus===true ? "open" : "closed"}
          onChange={(e) => setBugStatus(e.target.value)}
        />
        <button type="submit" >
          Save Bug
        </button>
      </form>
    </>
  );
};

export default EditBug;
