import React, {Component} from 'react';

class Rewards extends Component {
  
    render(){
        return(
            <div>
              {!this.props.check?
            <div> You need to buy product to receive reward </div>
            :<div align = 'center'>
                <button
                          class="btn btn-primary"
                          onClick={() => {
                            this.props.withdraw()
                          }}
                        >
                          Redeem reward
                </button>
                <h4>{this.props.noti}</h4>
            </div>}
            </div>
        )
    }
}

export default Rewards;