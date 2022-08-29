import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

function AddProduct({ modal, setModal, product, update }) {
  // const [show, setShow] = useState(modal);
  const history = useHistory()
  const [name, setName] = useState(null)
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState("")
  const [sellerID, setSellerID] = useState("")
  const [productID, setProductID] = useState("")
  const [discount, setDiscount] = useState("")


  const handleClose = () => setModal(false);
  const handleChange = async () => {
    if (update) {
      
      await axios.patch('/api2/update/', {
        name,
        price,
        quantity,
        description,
        category,
        sellerID,
        productID,
        discount,
      }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          toast.success('product updated')
          
            handleClose()
            // history.push('/')
          
          

        }
        else
          toast.error(" product update failed")
      }).catch((e) => {
        console.log(e)
        toast.error(e.message)
      })
    } else {
      await axios.post('/api2/product/add', {
        name,
        price,
        quantity,
        description,
        category,
        sellerID,
        discount,
      }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          setTimeout(() => {
            toast.success("new product added")
          }, 1000)
          handleClose()
          history.push('/supply')
        }
      }).catch((e) => {
        console.log(e)
        alert(e.message)
      })
    }

  }
  const setDetails = () => {
    if (update) {
      console.log(product);

      setName(product.name)
      setPrice(product.price)
      setQuantity(product.countInStock)
      setDescription(product.description)
      setCategory(product.category)
      setRating(product.rating)
      setProductID(product.productID)
      setSellerID(product.sellerID)
      setDiscount(product.discount)
    }
  }
  useEffect(() => {

      setDetails()
  }, [])

  return (
    <>
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{update ? 'Update product' : 'Add product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{fontWeight:'bolder'}}>Product name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            {!update &&
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}>SellerID</Form.Label>
              <Form.Control type='string' value={sellerID}
                onChange={(e) => setSellerID(e.target.value)} placeholder='Enter price' />
            </Form.Group>
}
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}>Description</Form.Label>
              <Form.Control as='textarea' rows={2} value={description}
                onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}>Price</Form.Label>
              <Form.Control type='string' value={price}
                onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
            </Form.Group>
            {!update &&
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}>Category</Form.Label>
              <Form.Control type='string' value={category}
                onChange={(e) => setCategory(e.target.value)} placeholder='Enter price' />
            </Form.Group>
}
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}> In-stock</Form.Label>
              <Form.Control type='number' min="0" value={quantity}
                onChange={(e) => setQuantity(e.target.value)} placeholder='how many in stock?' />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="productAdd"
            >
              <Form.Label style={{fontWeight:'bold'}}>Rating</Form.Label>
              <Form.Control type='string' value={rating}
                onChange={(e) => setRating(e.target.value)} placeholder='Enter rating' />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          </div>
          <Button style={{ backgroundColor: '#162030' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ backgroundColor: '#162030' }} onClick={handleChange}>
            {update ? 'Save Changes' : 'Add new one'}
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>

  )
}

export default AddProduct