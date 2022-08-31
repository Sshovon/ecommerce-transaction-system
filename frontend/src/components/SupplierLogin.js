import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './FormContainer'
import axios from 'axios'
import toast from 'react-hot-toast'


function SupplierLogin({setAuth}) {

    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()

        axios.post('/api3/supplier/signin', {
          email,
          password
        },
        {
          withCredentials: true,
        })
        .then(function (response) {
          const isAdmin = response.data.user.isAdmin;
          localStorage.setItem('supplier', JSON.stringify(response.data.user))
          process.env.test = true
          setAuth(true)
          if(isAdmin){
            history.push('/')
          }
          window.history.go(0)
          // setType(response.data.user.isAdmin)
          

        })
        .catch(function (error) {
          console.log(error);
          toast.error("invalid credientials")
        });
        
      }

  return (
    <FormContainer>
      <h3>Enter supplier information</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Supplier Email</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter your id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='secret'>
          <Form.Label>Password</Form.Label>
          <Form.Control
          required
            type='password'
            placeholder='Enter pin'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
           Log in
        </Button>
      </Form>

    </FormContainer>
  )

} 

export default SupplierLogin 