import './App.css';
import {useState, useEffect} from 'react'


function App() {

  const API_URL = 'http://localhost:3000/users';

const [users,setUsers] = useState([])

const [newUserName, setNewUserName] = useState('')
const [newUserEmail, setNewUserEmail] = useState('')
const [newUserNumber, setNewUserNumber] = useState('')

const [updateName, setUpdateName] = useState('')
const [updateEmail, setUpdateEmail] = useState('')
const [updateNumber, setUpdateNumber] = useState('')

console.log(API_URL)

function getUser(){
  fetch(API_URL)
  .then(response => response.json())
  .then((data) => data.json())
  .then((data) => {
    setUsers(data)
    console.log(data)
  })
}
// creates the user 

useEffect(() => {
  getUser()
}, []) 

//effect to get the user 

function deleteUser(id){
    fetch(API_URL`/${id}` , {
        method: 'DELETE',
    }).then(() => getUser())
}

//finds the id of the user and delets it 

function postNewUser(e){
  e.preventDefault()
  fetch(API_URL , {
      method: 'POST' , 
      mode: 'cors',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: newUserName,
        email: newUserEmail,
        number: newUserNumber,
    }), 
  }).then(() => getUser())
}
//would take in new info for a new user

function updateUser(e, userObject){
  e.preventDefault()
  let updatedUserObject = {
    ...userObject, 
    name: updateName,
    email: updateEmail,
    neumber: updateNumber,
  }
  fetch(`${API_URL}/${userObject.id}`,{
      method: 'PUT' , 
      mode: 'cors',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(updatedUserObject),
  } ).then(() => getUser())
}
//would updat the user, used mode : cors rto tsop an error i was getting 
  return (
    <div className="App">

<div className="App">
      <form className = "postBox">
        <h3>Create new user form</h3>
        <label>Name</label><br></br>
        <input onChange={(e) => setNewUserName(e.target.value)}></input><br></br>
        <label>Email</label><br></br>
        <input onChange={(e) => setNewUserEmail(e.target.value)}></input><br></br>
        <label>Number</label><br></br>
        <input onChange={(e) => setNewUserNumber(e.target.value)}></input><br></br>
        <br></br>
        <button variant="dark" onClick={(e) => postNewUser(e)}>Submit</button><br></br>
      </form>
      <br></br>

      {users.map((user, i) => (
        <div className="mapContainer" key={i}>
          <div>
            Name: {user.name} <br></br>
            Job Title: {user.email} <br></br>
            Company Name: {user.number} <br></br>
            <button type = "btn btn-dark" onClick={() => deleteUser(user.id)}>🗑</button>
          </div>
          <form>
            <label>Update Name</label>
            <input
              onChange={(e) => setUpdateName(e.target.value)}
            ></input>
            <br></br>
            <label>Update Email</label>
            <input
              onChange={(e) => setUpdateEmail(e.target.value)}
            ></input>
            <br></br>
            <label>Update Number</label>
            <input
              onChange={(e) => setUpdateNumber(e.target.value)}
            ></input>
            <br></br>
            <button variant="dark" onClick={(e) => updateUser(e, user)}>Update</button>
          </form>
        </div>
      ))}
    </div>
  </div>
  )
}
 
export default App;
