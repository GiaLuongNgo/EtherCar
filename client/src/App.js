import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import News from './components/New';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/login';
import {Navbar, Nav,Form } from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      
      <div>
       <Router>
           <div>
           {/* <ul classname = 'Nav'>
                <li className = 'Ele'><Link to="/">Home</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul> */}
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand><Link to="/">CAR MaRKET</Link></Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/news">News</Link></Nav.Link>
                <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                <Nav.Link><Link to="/about">About</Link></Nav.Link>
              </Nav>
              <Form inline>
                <Login/>                
              </Form>
            </Navbar>
            <Route exact path="/" component={Home}/>
            <Route path="/news" component={News}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
           </div>
       </Router>
       </div>
    )
    ;
  }
}


export default App;
