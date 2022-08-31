import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card  className='my-3 p-3' >
      <Link to={`/product/view?ID=${product.productID}`}>
        {/* {console.log(product)} */}
        <Image  src={product.image.path} thumbnail={true} variant='top'  />
        {/* <Card.Img> */}
          {/* <Image src= {product.image} roundedCircle style={{width:'10', height:'180'}} /> */}
        {/* </Card.Img> */}
      </Link>

      <Card.Body>
        <Link to={`/product/view?ID=${product.productID}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
            color="black"
          />
        </Card.Text> */}

      </Card.Body>
      <Card.Footer as='h3' style={{paddingLeft: '30%'}}  >${product.price}</Card.Footer>

    </Card>
  )
}
 
export default Product
