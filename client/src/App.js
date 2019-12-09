import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Rewards from './components/Rewards';
import About from './components/About';
import {Navbar, Nav,Form, Button } from 'react-bootstrap';
import web3 from './web3';
import marketPlace from './marketplace';
import carReward from './carReward';
import Web3 from 'web3'
// import getWeb3 from './getWeb3'
import logo from './logo.png'
import Typography from '@material-ui/core/Typography';

class App extends Component {

  async componentDidMount() {
    
    await this.getAccounts();
    await this.checkBuyer()
    
  }

  constructor(props){
    super(props);
    this.state = {
      balance: 0,
      account: '',
      productCount: 0,
      products: [],
      loading: true,
      check: false,
      reward: 0
    };

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.addMinter = this.addMinter.bind(this)
    this.trigger = this.trigger.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.checkBuyer = this.checkBuyer.bind(this)

  }

  async createProduct(name, price) {
    this.setState({ loading: true })
    await marketPlace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  async purchaseProduct(id, price) {
    this.setState({ loading: true })
    await marketPlace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    // this.state.buyers.push(this.state.account)
  }

  async addMinter() {
    await carReward.methods.addMinters(this.state.account).send({from: this.state.account})
    this.setState({noti: 'you are added to blockchain'})
  }

  async trigger() {
    await carReward.methods.trigger().send({from: this.state.account})
    this.setState({noti: 'you are triggered'})
  }

  async withdraw(){
    await carReward.methods.withdraw().send({from: this.state.account})
    this.setState({noti: 'you are withdrawed'})
    this.setState({
      buyers: [...this.state.buyer, this.state.account]
    })
  }

  async checkBuyer(){
    let buyer =  await marketPlace.methods.buyer().call()
  
      if(buyer === this.state.account){
        this.setState({check : true})
      }
    
  }


  async getAccounts() {
    // let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    let balance = await web3.eth.getBalance(accounts[0]);
    let balanceWei = await Web3.utils.fromWei(balance, "ether");
    this.setState({balance : balanceWei})
    console.log(balanceWei)
    this.setState({ balanceWei : balanceWei})
    // let marketplace = marketPlace;

    // this.setState({ marketplace })
    const productCount = await marketPlace.methods.productCount().call()
    console.log(productCount);
    
    this.setState({ productCount })
    // this.setState({buyers})
      // Load products
      for (var i = 0; i < productCount; i++) {
        const product = await marketPlace.methods.products(i).call()
        // const buyer = await marketplace.methods.buyers(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
    let value = await carReward.methods.balanceOf(this.state.account).call()
    let reward = await Web3.utils.fromWei(value, "ether");
    this.setState({reward: reward})
    console.log(value)

      console.log(this.state.products)
      console.log(this.state.buyers)
      
      
      this.setState({ loading: false})

  }

  render() {
    return (
      
      <React.Fragment>
      {/* <Login/> */}
       <Router>
           <div>
            <Navbar bg="info" variant="info" position="relative">
              <Navbar.Brand><Link to="/"><img className ='navbar-toggler-icon' src ={logo} alt ='logo' ></img> </Link></Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link><Link to="/"><Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography></Link></Nav.Link>
                <Nav.Link><Link to="/sell"><Typography variant="h6" color="inherit" noWrap>
            Sell
          </Typography></Link></Nav.Link>
                <Nav.Link><Link to="/rewards"><Typography variant="h6" color="inherit" noWrap>
            Rewards
          </Typography></Link></Nav.Link>
                <Nav.Link><Link to="/about"><Typography variant="h6" color="inherit" noWrap>
            Abouts
          </Typography></Link></Nav.Link>
              </Nav>
              <div>
                <p class="text-white">Account : {this.state.account}</p> 
                <p class="text-white">Balance : {this.state.balance} ETH</p>
                <p class="text-white">Reward : {this.state.reward} SIM</p>
              </div>
                
            </Navbar>
            {/* <img src = {banner} alt ='' ></img> */}
            <br></br>
            <div  maxWidth="sm">
            <Route exact path="/" component={() => <Home 
                  products={this.state.products}
                  purchaseProduct={this.purchaseProduct}
                  loading = {this.state.loading} />}/>
            <Route path="/sell" component={() => <AddProduct 
                  products={this.state.products}
                  createProduct={this.createProduct}
                  />}/>
            <Route path="/rewards" component={() => <Rewards
            addMinter = {this.addMinter}
            trigger = {this.trigger}
            withdraw = {this.withdraw}
            noti = {this.state.noti}
            check ={this.state.check}
            checkBuyer= {this.checkBuyer}
            />}/>
            <Route path="/about" component={About}/>
            </div>
           </div>
       </Router>
       
       </React.Fragment>
    )
    ;
  }
}


export default App;



