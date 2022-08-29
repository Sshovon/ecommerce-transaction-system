import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import BankScreen from './BankScreen'



const CartScreen = () => {
  // const productId = match.params.id

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  //   const dispatch = useDispatch()

  //   const cart = useSelector((state) => state.cart)
  //   const { cartItems } = cart

  let history = useHistory()

  const [cartItems, setCartItems] = useState([])
  const [qty, setQty] = useState(null)
  const load = false

  // const [cartItems, setCartItems]=useState(null)

  const getCart = async () => {
    await axios.get('/api3/cart/view', {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data.cart);
        setCartItems([...response.data.cart])
        // setQty(response.data.cart)
      })
      .catch(function (error) {
        console.log(error);

      });
  }



  useEffect(() => {
    // if (productId) {
    // //   dispatch(addToCart(productId, qty))
    //  getCart()
    // }
    getCart()


  }, [load])
  ////////////////////////////////////////////////////////////////////////////




  const removeFromCartHandler = async (id) => {
    // dispatch(removeFromCart(id))
    console.log(id)
    await axios.delete(`/api3/cart/remove?productid=${id}`, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        // setCartItems([...response.data.cart])
        if (response.status) getCart()
      })
      .catch(function (error) {
        console.log(error);
        alert('Error occured during deleting item')
      });
  }


  const checkoutHandler = async () => {
    localStorage.setItem('amount',cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2))
    // console.log(localStorage.getItem('amount'))
    history.push('/payment')
    // await axios.post('/api3/order/place',{
    //   orders : cartItems,
    //   //add to do
    // }, {
    //   withCredentials: true,
    // })
    // .then(function (response) {
    //   console.log(response.data.cart);
    //   setCartItems([...response.data.cart])
    // })
    // .catch(function (error) {
    //   console.log(error); 
    // }); 


  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {console.log(cartItems)}
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productID}>
                <Row >
                  {/* <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col> */}
                  <Col md={3} style={{ paddingTop: '10px' }}>
                    <Link to={`/product/${item.product}`}>{item.productID}</Link>
                  </Col>
                  <Col md={3} style={{ paddingTop: '10px' }}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                    // onChange = {(e)=> }
                    
                    >
                      {[...Array(5).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.productID)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}


export default CartScreen