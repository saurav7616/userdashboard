import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './AddUser.css'

const AddUser = ({formClose}) =>{

  //function to be called on add user form submission
  const formSubmit = ()=>{
    //form data
    const user = {
      name : document.getElementsByName('name')[0].value,
      username : document.getElementsByName('username')[0].value,
      address : document.getElementsByName('address')[0].value,
      contact : document.getElementsByName('contact')[0].value,
      email : document.getElementsByName('email')[0].value,
      dob : document.getElementsByName('dob')[0].value
    }

    const validate = Object.values(user).every(value => value!='')      //checking empty fields in form

    if(validate){
      //add user api call
      fetch('https://immense-garden-30803.herokuapp.com/adduser', {
        method : "POST",
        body : JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => res.json())
      .then(data => {
        formClose();
        window.alert(data);
      })
      .catch(err => window.alert("error : " + err))
    } else {
      window.alert("Fill all fields.");
    }
  }

  return(
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        '& > :not(style)': { 
          m: 1,
        },
      }}
    >
      {/* ---------------------form fields----------------------------- */}
      <TextField
        required
        className="name"
        id="outlined-required"
        label="Name"
        name='name'
        placeholder="John"
        focused
      />
      <TextField
        required
        className="username"
        id="outlined-required"
        label="Username"
        name='username'
        placeholder="John_01"
        focused
      />
      <TextField
        required
        className="address"
        id="outlined-required"
        label="Address"
        name='address'
        placeholder="Kulas Light, Apt. 556, Gwenborough"
        focused
      />
      <TextField
        required
        className="contact"
        id="outlined-required"
        name='contact'
        label="Contact Number"
        placeholder="9876213221"
        focused
      />
      <TextField
        required
        className="email"
        id="outlined-required"
        type="email"
        name='email'
        label="Email"
        placeholder="john@gmail.com"
        focused
      />
      <TextField
        required
        className="dob"
        name='dob'
        id="outlined-required"
        label="Date of Birth"
        type='date'
        focused
      />
      {/* -------------submit and cancel buttons--------------------- */}
      <div>
        <Button variant="contained" color="success" sx={{width : '15ch', padding : '5px', marginRight:'15px'}} onClick={formSubmit}>+ Add User</Button>
        <Button variant="outlined" color="error" sx={{width : '15ch', padding : '5px'}} onClick={formClose}>Cancel</Button>
      </div>
    </Box>
  );
}

export default AddUser;