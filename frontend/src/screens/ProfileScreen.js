import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Modal, Accordion, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
const concat = require("concat-stream")
//const fs = require('fs')


function ProfileScreen() {

    const [validatedItem, setValidatedItem] = useState(null)
    const [orders, setOrders] = useState([])
    const [transaction, setTransaction] = useState(null)
    const [user, setUser] = useState(null)
    const [type, setType] = useState("")
    const history = useHistory()
    const [pin, setPin] = useState("")
    const [showBal, setShowBal] = useState("")
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    const [balance, setBalance] = useState("")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleFade = () => setOpen(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [selectedFile, setSelectedFile] = useState(null)
    const uploadHandler = async () => {
        // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const data = new FormData()
        //data.append("file", fs.createReadStream(selectedFile))
        data.pipe(concat(data => {
            axios.post('/api2/product/upload', data, {
                headers: data.getHeaders()
            })

        }))
    }
    const validateTransaction = async (trxID, quantity, productID, orderID) => {
        setValidatedItem({
            trxID,
            quantity,
            productID,
            orderID
        })
        await axios.post('/api1/valid/validate', { trxID, accountNumber: user.accountNumber })
            .then((res) => {
                // console.log(res)
                if (!res.data.error) {
                    setTransaction(res.data)
                    setOpen(true)
                } else {
                    toast.error("No transaction exists")
                }
            }).catch((e) => {
                toast.error("No transaction exists")
            })
    }

    const changeOrderStatus = async () => {
        // console.log("changing order status")
        const res = await axios.post('/api3/order/changestatus', { orderID: validatedItem.orderID })
        // console.log(res)
    }

    const validateOrder = async () => {
        await axios.post('/api2/supplier/validateorder', {
            trxID: validatedItem.trxID,
            quantity: validatedItem.quantity,
            productID: validatedItem.productID,
            orderID: validatedItem.orderID
        }, { withCredentials: true }).then((res) => {
            // console.log(res.data)
            if (res.data.message === 'success') {
                if (res.data.changeStatus) {
                    changeOrderStatus()
                }
                setOpen(false)
                window.history.go(0)
                // history.push('/profile')
            }
        }).catch(e => {
            console.log(e.message)
            alert(e.message)
        })
    }

    const balanceCheck = async () => {
        await axios.post('/api1/balance', { accountNumber: (type === 'user' ? user.bankInformation.accountNumber : user.accountNumber) })
            .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    setBalance(res.data)
                    setTimeout(() => {
                        setShowBal(true)
                        setLoader(false)
                    }, 1000)
                }
                else {
                    toast.error(res.error)
                }

            }).catch((e) => {
                console.log(e)
                toast.error(e.message)
            })
    }

    const clickHandler = async () => {
        const { data } = await axios.post('/api3/bank/validatesecret', { secret: pin },
            {
                withCredentials: true,
            })
        console.log(data)
        if (data.status === true) {
            setShow(false)
            setLoader(true)
            balanceCheck()
        }
        else {
            toast.error('Pin is not validated')
        }

    }


    const getOrders = async () => {
        const user = JSON.parse(localStorage.getItem(localStorage.key(0)))
        if(user){
            await axios.post('/api2/supplier/view', { sellerID: user.sellerID }).then((res) => {
                 console.log(res.data)
                setOrders([...res.data])
            }).catch((e)=>{
                toast.error(e)
            })
        }
        
    }

    useEffect(() => {
        // if()
        getOrders()
        setType(localStorage.key(0))
        if(!user)
            setUser(JSON.parse(localStorage.getItem(localStorage.key(0))))
    }, [user])
    return (
        <div style={{ width: '90%', marginLeft: '10%' }} >
            {/* {console.log(user)} */}
            {transaction && <div>
                <Modal show={open} onHide={handleFade}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction Details</Modal.Title>
                    </Modal.Header>
                    <blockquote className="blockquote mb-0" style={{ margin: '20px' }}>
                        Your account <b>({transaction.inID})</b> have received <b>{transaction.amount}</b> from account number <b>{transaction.outID}</b>
                    </blockquote>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleFade}>
                            Close
                        </Button>
                        <Button variant="success" onClick={validateOrder}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            }
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
                                Email: {type === 'user' ? user.contactInformation.email : user.email} <br />
                                
                            </Card.Footer>
                            {/* <Button variant="">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                    <Card className="text-center" style={{ marginTop: '100px', width: '400px' }}>
                        <Card.Header>Financial Information</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Special title treatment</Card.Title> */}

                            <blockquote className="blockquote mb-0">
                                <b>Bank account : {type === 'user' ? user.bankInformation.accountNumber : user.accountNumber} </b>

                            </blockquote>
                            <br />
                            {loader && <Loader />}
                            {showBal && <div>
                                <blockquote className="blockquote mb-0">
                                    <p>Bank balance : $ {balance} </p>

                                </blockquote>
                            </div>}
                            <br />



                            <Button variant="primary" onClick={e => {
                                console.log("heyy")
                                if (localStorage.key(0) === "supplier" || localStorage.key(0) === "admin") {
                                    console.log(localStorage.key(0))
                                    setLoader(true)
                                    balanceCheck()
                                    setTimeout(() => {
                                        setShowBal(true)
                                        setLoader(false)
                                    }, 1000)
                                } else {
                                    handleShow()
                                }

                            }}>Check balance</Button>


                            <div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Authentication</Modal.Title>
                                    </Modal.Header>
                                    <Form.Group className="mb-3" controlId="athentication" style={{ margin: '20px' }}>
                                        <Form.Label style={{ fontWeight: "bold" }}>Account pin</Form.Label>
                                        <Form.Control placeholder='Enter your pin' type="password" max={4} value={pin} onChange={e => setPin(e.target.value)} />
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={clickHandler}>
                                            Proceed
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            {/* <Button variant="">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </div>
            }
            {/* {console.log("user", user)} */}
            {type === "supplier" &&
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
                                                            {item.validateOrder ? 'Delivered' : (
                                                                <Button
                                                                    type='button'
                                                                    variant='success'
                                                                    size='sm'
                                                                    onClick={() => validateTransaction(item.trxID, item.quantity, item.productID, item.orderID)}
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

                            <br />

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
                                            {/* {console.log(orders)} */}
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

                                            {orders.filter(item => item.validateOrder === true).map((item) => (
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
            }
            {/* <div>


                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
                <button onClick={uploadHandler}> upload</button>

            </div> */}
        </div>
    )
}

export default ProfileScreen