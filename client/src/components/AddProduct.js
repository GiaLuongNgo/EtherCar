import React, {Component} from 'react';
import "../App.css";


class AddProduct extends Component {
    render(){
        return(
            <div className="bg-light mb-3" style= {{textAlign : 'center', width : '500px', margin: "0 auto"}}>
            <h3>Product for sale</h3>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.productName.value
              const price = this.productPrice.value  
              const speed = this.productSpeed.value
              const level = this.productLevel.value
              this.props.createProduct(name, price, speed, level)
            }}>
              <div className="form-group mr-sm-2" style= {{width : '300px', display: 'inline-block'}}>
                <input
                  id="productName"
                  type="text"
                  ref={(input) => { this.productName = input }}
                  className="form-control"
                  placeholder="Car Name"
                  required />
              </div>
                <br/>
              <div className="form-group mr-sm-2"  style= {{width : '300px', display: 'inline-block'}}>
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => { this.productPrice = input }}
                  className="form-control"
                  placeholder="Car Price ETH"
                  required />
              </div>
              <br/>
              <div className="form-group mr-sm-2"  style= {{width : '300px', display: 'inline-block'}}>
                <input
                  id="productSpeed"
                  type="text"
                  ref={(input) => { this.productSpeed = input }}
                  className="form-control"
                  placeholder="Car Speed Km/h"
                  required />
              </div>
              <br/>
              <div className="form-group mr-sm-2"  style= {{width : '300px', display: 'inline-block'}}>
                <input
                  id="productLevel"
                  type="text"
                  ref={(input) => { this.productLevel = input }}
                  className="form-control"
                  placeholder="Car Level"
                  required />
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
        )
    }

}

export default AddProduct;