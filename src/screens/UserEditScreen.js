import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser} from '../sagaActions/sagaUserAction'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Meta from '../components/Meta'

const UserEditScreen = () => {
    const {id} = useParams()
    const userId = id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const userDetails = useSelector(state=>state.userDetails)
    const {loading, error, user} = userDetails
    
    const userUpdate = useSelector(state=>state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate
    

    useEffect(()=>{
      if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history.push('/admin/userlist')
      }
      
    }, [dispatch, history, successUpdate])



    useEffect(()=>{
    if( !user || !user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
    }, [user, userId, dispatch])


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }


  return (
    <>
    <Meta title='Edit Your Details' />
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
      (
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>
        
        <Form.Group controlId='idAdmin'>
            <Form.Check 
            type='checkbox'  
            label='Is Admin'
            checked={isAdmin}
            onChange={(e)=>setIsAdmin(e.target.checked)}
            > 
            </Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Update
        </Button>        
      </Form>
      )}      
    </FormContainer>
    </>
  )
}

export default UserEditScreen
