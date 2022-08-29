import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Accordion, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'



function ProfileScreen() {

    const [orders, setOrders] = useState([])
    const [ user, setUser] = useState(null)
    const [type, setType] = useState("")
    const history = useHistory()
    const validateOrder = async(trxID, quantity, productID)=>{
        await axios.post('/api2/supplier/validateOrder',{trxID, quantity, productID}, { withCredentials: true }).then((res) => {
            console.log(res.data)
            history.push('/profile')
        }).catch(e=>{
            console.log(e.message)
            alert(e.message)
        })
    }

    const getProfile = async () => {
        await axios.post('/api2/supplier/view', { sellerID: '33333' }, { withCredentials: true }).then((res) => {
            console.log(res.data)
            setOrders([...res.data])
        })
    }

    useEffect(() => {
        getProfile()
        setType(localStorage.key(0))
        setUser(JSON.parse(localStorage.getItem(localStorage.key(0))))
    }, [])
    return (
        <div style={{ width: '90%', marginLeft: '10%' }} >
            {console.log(user)}
            {user &&
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Card style={{ width: '23rem' }}>
                    <Card.Img variant="top" src='/images/profile.png' alt="could not load" style={{ width: '140px', height: '140px', marginLeft: '30%' }} />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            What kind of product he sells and  a litlle bit of description
                        </Card.Text>
                        <Card.Footer className='text-muted'>
                            Email: {type === 'user' ? user.contactInformation.email : user.email} <br/>
                            Bank Account: 33333 <br />
                            Bank Balance: $ 100000
                        </Card.Footer>
                        {/* <Button variant="">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
                <Card className="text-center" style={{ marginTop: '100px' }}>
                    <Card.Header>Details</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
}
            <div>
                {orders.length !== 0 &&
                    <Accordion defaultActiveKey="1">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    On going orders
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ListGroup variant='flush'>
                                        {console.log(orders)}
                                        <ListGroup.Item>
                                            <Row>
                                                
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    ProductID
                                                </Col>
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    Item no
                                                </Col>
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    Price
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>

                                        {orders.filter(order => order.validateOrder === false).map((item) => (
                                            <ListGroup.Item key={item._id}>
                                                <Row >
                                                    {/* <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col> */}
                                                    <Col md={3} style={{ paddingTop: '10px' }}>
                                                        {item.orderID}
                                                    </Col>
                                                    
                                                    <Col md={3} style={{ paddingTop: '10px' }}>{item.quantity} pieces</Col>
                                                    <Col md={3} style={{ paddingTop: '10px' }}>
                                                        $ {item.amount}
                                                    </Col>
                                                    <Col md={3}>
                                                        {item.validateOrder ? 'Deliverd' : (
                                                            <Button
                                                                type='button'
                                                                variant='success'
                                                                size='sm'
                                                            onClick={() => validateOrder(item.trxID, item.quantity, item.productID )}
                                                            >
                                                                <i className='fas fa-check-circle'> Validate</i>
                                                            </Button>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <br/>

                        {/* <--------------------- Completed orders ----------------> */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Completed orders
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <ListGroup variant='flush'>
                                        {console.log(orders)}
                                        <ListGroup.Item>
                                            <Row>
                                                
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    ProductID
                                                </Col>
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    Item no
                                                </Col>
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    Price
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>

                                        {orders.filter(item=> item.validateOrder === true).map((item) => (
                                            <ListGroup.Item key={item._id}>
                                                <Row >
                                                    {/* <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col> */}
                                                    <Col md={3} style={{ paddingTop: '10px' }}>
                                                        {item.orderID}
                                                    </Col>
                                                    
                                                    <Col md={3} style={{ paddingTop: '10px' }}>{item.quantity} pieces</Col>
                                                    <Col md={3} style={{ paddingTop: '10px' }}>
                                                        $ {item.amount}
                                                    </Col>
                                                    <Col md={3}>
                                                        {item.validateOrder ? 'Deliverd' : (
                                                            <Button
                                                                type='button'
                                                                variant='success'
                                                                size='sm'
                                                            onClick={() => validateOrder(item.trxID)}
                                                            >
                                                                <i className='fas fa-check-circle'> Validate</i>
                                                            </Button>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                }
            </div>
            <div>
                <input type="file" onChange={e => console.log(e)} />
            </div>
        </div>
    )
}

export default ProfileScreen