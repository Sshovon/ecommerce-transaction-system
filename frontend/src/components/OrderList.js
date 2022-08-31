import React, {useEffect, useState} from 'react'
import { Accordion, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function OrderList({ ord }) {
    const [order, setOrder] = useState(null)
    
    useEffect(()=>{
        setOrder(ord)
    },[])

    return (

        <>
        {console.log(order)}
            {order &&
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                            <Accordion.Toggle as={Button} variant="text" eventKey="0">
                                <div>
                                    OrderID: {order.orderID}
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Toggle as={Button} variant="text" eventKey="0">
                                <div>
                                    TransactionID: {order.trxID}
                                </div>
                            </Accordion.Toggle>
                            </div>
                            
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup variant='flush'>
                                    {console.log(order)}
                                      {order.orders.map((item) => ( 
                                        <ListGroup.Item key={item._id}>
                                            <Row >
                                                {/* <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col> */}
                                                <Col md={3} style={{ paddingTop: '10px' }}>
                                                    <Link to={``}>{item.productID}</Link>
                                                </Col>
                                                <Col md={3} style={{ paddingTop: '10px' }}>{item.quantity} pieces</Col>
                                                <Col md={3}>
                                                    $ {item.price}
                                                </Col>
                                                <Col md={3}>
                                                    {order.statusDelivered ? 'Delivered' : 'Processing'}
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


        </>

    )
}

export default OrderList