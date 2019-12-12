import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Rewards from './components/Rewards';
import About from './components/About';
import {Navbar, Nav } from 'react-bootstrap';
import loadingImg from "./comet-spinner.gif";
import marketPlace from './marketplace';
import Web3 from 'web3'
import getWeb3 from './getWeb3'
import logo from './l.png'
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
    this.withdraw = this.withdraw.bind(this)
  }

  async createProduct(name, price, speed, level) {
    this.setState({ loading: true })
    await marketPlace.methods.createProduct(name, price, speed, level).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  async purchaseProduct(id, price) {
    this.setState({ loading: true })
    await marketPlace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    // this.state.buyers.push(this.state.account)
  }

  async withdraw(){
    await marketPlace.methods.buyerWithdraw(this.state.account).send({from: this.state.account})
    this.setState({noti: 'you just withdrawed reward' })
  }

  async checkBuyer(){
    let check =  await marketPlace.methods.isMinter(this.state.account).call()  
        this.setState({check : check})
  }


  async getAccounts() {
    let web3 = await getWeb3();
    this.setState({web3 : web3})
    let accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    let balance = await web3.eth.getBalance(accounts[0]);
    let balanceWei = await Web3.utils.fromWei(balance, "ether");
    this.setState({balance : balanceWei})
    console.log(balanceWei)
    this.setState({ balanceWei : balanceWei})
    const productCount = await marketPlace.methods.productCount().call()
    console.log(productCount);
    
    this.setState({ productCount })
      // Load products
      for (var i = 0; i < productCount; i++) {
        const product = await marketPlace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
    let value = await marketPlace.methods.balanceOf(this.state.account).call()
    let reward = await Web3.utils.fromWei(value, "ether");
    this.setState({reward: reward})
    console.log(value)

      console.log(this.state.products)
      console.log(this.state.buyers)
      
      
      this.setState({ loading: false})

  }

  render() {
    if (!this.state.web3) {
      return (
        <div>
          <div align = 'center'>
            <img src={ loadingImg } alt="Loading Web3, accounts, and contract..." />
            <p>You need to connect to MetaMask</p>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
      {/* <Login/> */}
       <Router>
           <div>
            <Navbar bg="info" variant="info" position="relative">
              <Navbar.Brand><Link to="/"><img className ='navbar-icon' src ={logo} alt ='logo' ></img>  </Link></Navbar.Brand>
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
            withdraw = {this.withdraw}
            noti = {this.state.noti}
            check ={this.state.check}
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



