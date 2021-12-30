import "./App.css";
import { useState } from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(toDo);
    if (toDo === "") {
      return;
    }
    // don't modify toDo directly, instead of using setToDo function
    setToDo("");
    setToDos((currentArray) => [toDo, ...currentArray]);
  };

  console.log(toDos);
  return (
    <div className="App">
      <h1> My TO DO list {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={toDo}
          placeholder="Write your to do"
        ></input>
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
