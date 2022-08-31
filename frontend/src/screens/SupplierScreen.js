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
    // const [admin, setAdmin] = useState(false)

    const fetchProducts = async () => {
        if(localStorage.getItem('supplier')){
            const sellerID = JSON.parse(localStorage.getItem('supplier')).sellerID
            console.log(sellerID)
            const { data } = await axios.get(`/api2/product/view?sellerID=33333`)
        console.log(data)
        setProducts(data)
        }
        

        // setUser(JSON.parse(localStorage.getItem('user')))
        // window.history.go(0)
    }


    useEffect(() => {
        
        // console.log(JSON.parse(localStorage.getItem('supplier')).accountNumber)
     
            fetchProducts()           
        
    },[auth,modal])
    return (
        <>
        {/* {console.log(products)} */}
            {(!auth && !localStorage.getItem('supplier')) && <SupplierLogin setAuth={setAuth}/>}
            {
                auth || localStorage.getItem('supplier') && <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1>Your Products</h1>
                    <Button style={{backgroundColor:'#162030'}} onClick={e => setModal(true)}>Add product</Button>
                    
                    {modal && <AddProduct modal={modal} setModal={setModal} product={null} update = {false} />}
                    </div>
                    <Row>
                        {products.length>0 && products.map((product) => (
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