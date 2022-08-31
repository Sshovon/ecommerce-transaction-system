import React , {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products'
import axios from 'axios'

const HomeScreen = () => { 

  const [products, setProducts] = useState([])
  const [check, setCheck] = useState(false)
  const [user, setUser] = useState(null)
 
  const fetchProducts = async ()=>{
    // const {data} = await axios.get('/product/viewall')
    const {data} = await axios.get('/api2/product/view')
    // console.log(data)
    setProducts(data)
    setCheck(true)
    // setUser(JSON.parse(localStorage.getItem('user')))
    // window.history.go(0)
  } 
  
  useEffect(()=>{

    
    // console.log(JSON.parse(localStorage.getItem('user')))
    // window.history.go(0)
    if(!check )
      fetchProducts()
    // if(check && !JSON.parse(localStorage.getItem('user'))){
    //   window.history.go(0)
    // }


  },[products])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        
        {products.map((product) => (
          <Col key={product.productID} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} update = {false}/>
          </Col>
        ))}
      </Row>
      {/* {window.history.go(0)} */}
    </>
  )
}

export default HomeScreen
