import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { useHistory } from 'react-router-use-history'
import { Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../sagaActions/sagaUserAction'
import Meta from '../components/Meta'

const UserListScreen = () => {
//    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const userList = useSelector(state=>state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
      }
        
    }, [dispatch, userInfo])

    useEffect(()=>{
      if(!userInfo || !userInfo.isAdmin){
        history.push('/login')
      }
      // eslint-disable-next-line
    }, [history, successDelete])


    const deleteHandler=(id)=>{
      if(window.confirm("Are you sure want to delete this user?")){
        dispatch(deleteUser(id))
        .then(() => {
          // User successfully deleted, now fetch the updated user list
          dispatch(listUsers());
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error('Error deleting user:', error);
    });
      }
    }


  return (
    <>
    <Meta title='Users List' />
      <h1>Users</h1>
      {loading? <Loader/>: error? <Message variant='danger'>{error}</Message>:(
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user=>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.isAdmin? (<i className='fas fa-check' style={{color:'green'}}></i>):(
                  <i className='fas fa-times' style={{color:'red'}}></i>
                )}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i  className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=>
                  deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      )}  
    </>
  )
}

export default UserListScreen
