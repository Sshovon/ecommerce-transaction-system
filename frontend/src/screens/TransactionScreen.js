import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Row, Col, ListGroup, Button,Card } from 'react-bootstrap'

function TransactionScreen() {

    const [trxIn, setTrxIn] = useState([])
    const [trxOut, setTrxOut] = useState([])

    const getOrders = async () => {
        if(localStorage.key(0) === 'user'){
            const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user)
        await axios.get(`/api1/balance/transaction?accountNumber=${user.bankInformation.accountNumber}`).then((res) => {
            setTrxIn(res.data[0])
            setTrxOut(res.data[1])

        })
        }
        else{
            const user = JSON.parse(localStorage.getItem('supplier'))
        // console.log(user)
        await axios.get(`/api1/balance/transaction?accountNumber=${user.accountNumber}`).then((res) => {
            setTrxIn(res.data[0])
            setTrxOut(res.data[1])

        })
        }
        


    }

    useEffect(() => {
        // if()
        console.log("in transaction screen")
        getOrders()

    }, [])

    return (
        <div>
            
                <Accordion defaultActiveKey="0">
                {trxIn.length !== 0 &&
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle  eventKey="0">
                                <Card.Title >Incoming transactions</Card.Title>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup variant='flush'>
                                    {/* {console.log(trxIn)} */}
                                    <ListGroup.Item>
                                        <Row>

                                            <Col md={4} style={{ paddingTop: '10px' }}>
                                                Transaction-ID
                                            </Col>
                                            <Col md={4} style={{ paddingTop: '10px' }}>
                                                Sender-ID
                                            </Col>
                                            <Col md={4} style={{ paddingTop: '10px' }}>
                                                Time
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>

                                    {trxIn.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row >
                                                {/* <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col> */}
                                                <Col md={4} style={{ paddingTop: '10px' }}>
                                                    {item.trxID}
                                                </Col>

                                                <Col md={4} style={{ paddingTop: '10px' }}>{item.outID}</Col>
                                                <Col md={4} style={{ paddingTop: '10px' }}>
                                                    {new Date(item.date).toLocaleString()}
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
}

                    <br />

                    {/* <--------------------- Completed orders ----------------> */}
             {trxOut.length !== 0 &&
                    <Card>
                    <Card.Header>
                        <Accordion.Toggle eventKey="1">
                        <Card.Title> Outgoing transactions</Card.Title>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <ListGroup variant='flush'>
                                {/* {console.log(trxOut)} */}
                                <ListGroup.Item>
                                    <Row>

                                        <Col md={4} style={{ paddingTop: '10px' }}>
                                            Transaction-ID
                                        </Col>
                                        <Col md={4} style={{ paddingTop: '10px' }}>
                                            Receiver-ID
                                        </Col>
                                        <Col md={4} style={{ paddingTop: '10px' }}>
                                            Time
                                        </Col>

                                    </Row>
                                </ListGroup.Item>

                                {trxOut.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row >
                                            {/* <Col md={2}>
    <Image src={item.image} alt={item.name} fluid rounded />
  </Col> */}
                                            <Col md={4} style={{ paddingTop: '10px' }}>
                                                {item.trxID}
                                            </Col>

                                            <Col md={4} style={{ paddingTop: '10px' }}>{item.outID}</Col>
                                            <Col md={4} style={{ paddingTop: '10px' }}>
                                                {new Date(item.date).toLocaleString()}
                                            </Col>
                                            
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
}
                </Accordion>
            
        </div>
    )
}

export default TransactionScreen