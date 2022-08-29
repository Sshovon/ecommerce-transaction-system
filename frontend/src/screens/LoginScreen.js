import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import { login } from '../actions/userActions'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 

//   const fetchProduct = async ()=>{
//     const {data} = await axios.get(`/product/viewone?id=${id}`)
//     console.log(data)
//     setProduct(data) 
//   }

  const [data, setData] = useState(null)
  let history = useHistory()

  useEffect(()=>{
    console.log("lashit")
    data && console.log(data)

    if(data){
      // console.log(data.user.bankInformation)
    if(!data.user.bankInformation.setSecret){
      history.push("/bankintegration");

    }else{
      localStorage.setItem('user', JSON.stringify(data.user))
      process.env.test = true
      history.push("/")
      window.history.go(0)

    }
  }
  },[data, history])



  const submitHandler = async(e) => {
    e.preventDefault()
    await axios.post('/api3/user/signin', {
      email,
      password
  })
    .then(function (response) {
      console.log(response);
      setData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.error)
    });

    // await axios.get('/bank/secretstatus',{
    //   withCredentials: true
    // }).then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={'/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen