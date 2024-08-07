import React, {useState} from 'react'
// import {Link, useLocation} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import { Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../sagaActions/sagaCartAction'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'

const ShippingScreen = () => {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress ? shippingAddress.address:'')
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city:'')
    const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode:'')
    const [country, setCountry] = useState(shippingAddress ? shippingAddress.country:'')

    const dispatch = useDispatch()
    const history = useHistory()

    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

  return (
    <FormContainer>
      <Meta title='Shipping' />
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e)=>setCountry(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
