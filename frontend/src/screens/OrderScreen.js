import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Message from '../components/Message'
import OrderList from '../components/OrderList'

function OrderScreen() {
const [orders, setOrders] = useState([])
const getOrders = async () => {
    await axios.get('/api3/order/view', { withCredentials: true }).then((res) => {
        console.log(res.data)
        setOrders(res.data)
    })
}

useEffect(() => {
    getOrders()
}, [])
  return (
    <div>
        
         <div>
        {orders.length === 0 ? (
          <Message>
            Your order list is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
            <div>
            {orders.map((order) => (
               <OrderList ord = {order} />
            ))}
            </div>
        )}
            </div>
    </div>
  )
}

export default OrderScreen