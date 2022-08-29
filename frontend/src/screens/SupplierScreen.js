import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import SupplierLogin from '../components/SupplierLogin'
import Product from '../components/Product'
import AddProduct from '../components/AddProduct'


function SupplierScreen() {

    const [auth, setAuth] = useState(false)
    const [products, setProducts] = useState([])
    const [modal, setModal] = useState(false)

    const fetchProducts = async () => {
        // const {data} = await axios.get('/product/viewall')
        const { data } = await axios.get('/api2/product/view')
        console.log(data)
        setProducts(data)

        // setUser(JSON.parse(localStorage.getItem('user')))
        // window.history.go(0)
    }

    

    const addProduct = ()=>{
        
    }

    useEffect(() => {
     
            fetchProducts()
           
        
    },[auth,modal])
    return (
        <>
        {console.log(products)}
            {(!auth && !localStorage.getItem('supplier')) && <SupplierLogin setAuth={setAuth} />}
            {
                auth || localStorage.getItem('supplier') && <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1>Your Products</h1>
                    <Button style={{backgroundColor:'#162030'}} onClick={e => setModal(true)}>Add product</Button>
                    
                    {modal && <AddProduct modal={modal} setModal={setModal} product={null} update = {false} />}
                    </div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product.productID} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </div>
            }
        </>
    )
}

export default SupplierScreen