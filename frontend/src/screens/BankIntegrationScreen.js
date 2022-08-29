import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
// import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'


const BankIntegrationScreen = ({  }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [secret, setSecret] = useState('')
  
  const [message, setMessage] = useState(null)
  const history = useHistory()


//   const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    // console.log(user)
   
        axios.post('/api3/bank/integrate', {
            accountNumber,
            secret
        },
        {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data.user);
          if(response.data.user){
            localStorage.setItem('user', JSON.stringify(response.data.user))
            process.env.test = true
            history.push('/')
            window.history.go(0)
          }else
            alert('error occured')
        })
        .catch(function (error) {
          console.log(error);
        });

        


  }

  return (
    <FormContainer>
      <h3>Enter your bank information</h3>
      {message && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='accountNumber'>
          <Form.Label>Account no</Form.Label>
          <Form.Control
            type='accountNumber'
            placeholder='Enter account no'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='secret'>
          <Form.Label>Secret key</Form.Label>
          <Form.Control
            type='secret'
            placeholder='Enter pin'
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

    </FormContainer>
  )
}

export default BankIntegrationScreen