import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const UserList = ({users, fetch_user})=>{
  let keys = Object.keys(users[0])                  //getting keys for table column
  keys = keys.filter(key => key!=='id')

  //function to handle user deletion
  const deleteuser = (id)=>{
    fetch('https://immense-garden-30803.herokuapp.com/deleteuser', {
      method : "DELETE",
      body : JSON.stringify({ id:id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then(_ => fetch_user())
    .catch(err => window.alert("Error" + err))
  }

  return(
    <div>
      {/* ------------------users table-------------------- */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 ,bgcolor: 'black'}}>
          <TableHead>
            <TableRow >
              <TableCell sx={{color : 'white'}}>#</TableCell>
              {keys.map((col,i) => <TableCell sx={{color : 'white', fontWeight : 'bolder'}} align="center" key={i}>{col}</TableCell>)}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row,index) => (
              <TableRow key={index}>
                <TableCell sx={{color : 'white'}} component="th" scope="row">{index+1}</TableCell>
                {
                  keys.map((col,i) => 
                    <TableCell sx={{color : 'white', maxWidth: '20ch'}} align="center" key={i}>
                      { col!=='dob'? row[col] : row[col].split('T')[0]}
                    </TableCell>
                  )
                }
                <TableCell sx={{color : 'red', fontWeight : 'bolder'}} align="right" onClick={()=>{deleteuser(row['id'])}}>&#9932;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;