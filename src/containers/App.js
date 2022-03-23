import { useState, useEffect } from 'react';
import AddUser from '../components/add_user/AddUser';
import UserList from '../components/users_list/UserList';
import Button from '@mui/material/Button';
import './App.css';

document.title = "Users Dashboard"

function App() {
  const [users, setUsers] = useState([]);             //users state variable
  const [route, setRoute] = useState('users');        //route state variable
  const [res_ok, setRes_ok] = useState(false)         //response status state variable

  const fetch_user = () => {                          //function to get users list
    fetch('https://immense-garden-30803.herokuapp.com/users')
    .then(res => { 
      if(res.ok){
        setRes_ok(true)
      }
      return res.json()
    })
    .then(data => setUsers(data)) 
  }

  useEffect(()=>{
    if(route === 'users')
      fetch_user();
  },[route])

  const formOpen = ()=> setRoute('adduser')           //function to open form
  const formClose = ()=> setRoute('users')            //function to close form
  
  return (
    <div className="App">
      { route==='users' 
        ? (res_ok 
          ? <>{
                users.length>0 
                ? <UserList users = {users} formOpen={formOpen} fetch_user={fetch_user}/>
                : <h1 className='no-user'>No User Found</h1>
              }
              <Button variant="contained" sx={{float: 'right', marginTop: '15px'}} onClick={formOpen}>+ Add User</Button>
            </>
          : <h1>Loading...</h1>)
        : <AddUser formClose={formClose}/>
      }
    </div>
  );
}

export default App;