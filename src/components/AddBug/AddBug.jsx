import React, { useState } from "react";
import "./addbug.css";

const AddBug = ({setAdd}) => {
  const [bugTitle, setBugTitle] = useState("");
  const [bugAuthor, setBugAuthor] = useState("");
  const [bugLabel, setBugLabel] = useState("");
  const [bugStatus, setBugStatus] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9090/api/bug/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugTitle: bugTitle,
        bugAuthor: bugAuthor,
        bugLabel: bugLabel,
        bugStatus: bugStatus,
      }),
    });
    const data = await response.json();
    console.log(data);
    setAdd(false)
  };
  return (
    <>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <h3>Add a new bug</h3>
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
          placeholder="Bug status"
          value={bugStatus}
          onChange={(e) => setBugStatus(e.target.value)}
        />
        <button type="submit" >
          Add Bug
        </button>
      </form>
    </>
  );
};

export default AddBug;
