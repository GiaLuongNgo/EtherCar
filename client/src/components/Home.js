import React, {Component} from 'react';
import getWeb3 from '../getWeb3';
// import { Accounts } from 'web3-eth-accounts';
class Home extends Component {

    constructor(props){
        super(props);
        this.state = {balanceWei: []};
    }


    async componentDidMount(){
        let web3 = await getWeb3();
        // web3.enable();
        let accounts = await web3.eth.getAccounts()
        let balance = await web3.eth.getBalance(accounts[0]);
        let balanceWei = await web3.utils.fromWei(balance, "ether");
        console.log(balanceWei)
        this.setState({ balanceWei: balanceWei})
    }

    
    
    render(){
        return(
            <div>
                {this.state.balanceWei}
            </div>
        )
    }
}

export default Home;