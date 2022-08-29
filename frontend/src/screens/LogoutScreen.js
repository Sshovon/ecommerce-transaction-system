import React from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const LogoutScreen = async() => {

    
    let history = useHistory()

    await axios.get('/api3/user/signout',{
        withCredentials: true
    })
      .then(function (response) {
        console.log(response);
        localStorage.removeItem('user');
        history.push('/')
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error)
      });
 
  
}

export default LogoutScreen