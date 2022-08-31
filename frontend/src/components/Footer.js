import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{backgroundColor: "#F8F8F8",
    
    textAlign: "center",
    padding: "20px",
    marginTop: '20px',
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"}}>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; EcomShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
