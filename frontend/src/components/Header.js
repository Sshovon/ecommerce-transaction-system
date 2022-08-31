import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const Header = () => {

  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user) 
  // hist = useHistory() 

  const [user, setUser] = useState(null)
  const [supplier, setSupplier] = useState(null)


  const history = useHistory()
  const clickHandlerOUT = async () => {
    console.log('clickhanderOUT')
    if (localStorage.getItem('supplier')) {
      await axios.get('/api3/supplier/signout', {
        withCredentials: true
      })
        .then(function (response) {
          // console.log(response);
          if (response.status === 200) {
            localStorage.removeItem('supplier');
            setSupplier("")
            history.push('/')
            window.history.go(0)
          }

        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.error)
        });
    } else {
      await axios.get('/api3/user/signout', {
        withCredentials: true
      })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            localStorage.removeItem('user');
            setUser("")
            history.push('/')
            window.history.go(0)
          }

        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.error)
        });
    }



  }

  const getUser = () => {
    // console.log(localStorage.getItem('user'))
    if(!user === true && localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))

    }
    if(!supplier === true && localStorage.getItem('supplier'))
      setSupplier(JSON.parse(localStorage.getItem('supplier')))
  }

  useEffect(() => {
    // if(!re) reload()
    // console.log(user)
    
    getUser()
    // if(user) window.history.go(0)
  }, [user, supplier])

  useEffect(() => {
    return history.listen((location) => { 
       console.log(`You changed the page to: ${location.pathname}`) 
       getUser()
    }) 
 },[history]) 
  // useEffect(() => {
  //   setSupplier(JSON.parse(localStorage.getItem('supplier')))

  // }, [localStorage.getItem('supplier')])


  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect style={{ minHeight: '100px' }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><b>EcomShop</b></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="ms-auto" >
              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer> */}

              {!user || !user.bankInformation.setSecret ?
                <>
                  {console.log("user", supplier)}
                  {localStorage.getItem('supplier') && JSON.parse(localStorage.getItem('supplier')).isAdmin === false  &&
                    <LinkContainer to='/supply'>
                      <Nav.Link>
                        <i className='fas fa-user'> Sell on ECOM</i>
                      </Nav.Link>
                    </LinkContainer>
                  }

                  {/* {console.log(JSON.parse(localStorage.getItem('supplier')))} */}
                  {/* {console.log(localStorage.getItem('supplier'))} */}

                  {localStorage.getItem('supplier') ?
                    <>
                    {/* {(JSON.parse(localStorage.getItem('supplier')).isAdmin) &&  */}
                      <LinkContainer to='/transactions'>
                      <Nav.Link >
                        <i className='fas fa-user' > Transactions</i>
                      </Nav.Link>
                    </LinkContainer>
                    
                      <LinkContainer to='/profile'>
                        <Nav.Link >
                          <i className='fas fa-user' > Profile</i>
                        </Nav.Link>
                      </LinkContainer>
                      <Nav.Link >
                        <i className='fas fa-user' onClick={clickHandlerOUT} > Sign out</i>

                      </Nav.Link>

                    </>

                    :

                    <>
                    <LinkContainer to='/supply'>
                      <Nav.Link>
                        <i className='fas fa-user'> Sell on ECOM</i>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <Nav.Link>

                        <i className='fas fa-user' > Sign in</i>

                      </Nav.Link>
                    </LinkContainer>
                    </>
                  }
                </>

                :

                <>
                  <LinkContainer to='/cart'>
                    <Nav.Link >
                      <i className='fas fa-user' > Cart</i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/order'>
                    <Nav.Link >
                      <i className='fas fa-user' > Orders</i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/transactions'>
                      <Nav.Link >
                        <i className='fas fa-user' > Transactions</i>
                      </Nav.Link>
                    </LinkContainer>

                  <LinkContainer to='/profile'>
                    <Nav.Link >
                      <i className='fas fa-user' > Profile</i>
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link >
                    <i className='fas fa-user' onClick={clickHandlerOUT} > Sign out</i>
                  </Nav.Link>
                </>


              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
