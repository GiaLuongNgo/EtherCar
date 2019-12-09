import React, {Component} from 'react';
import "../App.css";


class AddProduct extends Component {
    render(){
        return(
            <div className="bg-light mb-3" style= {{textAlign : 'center', width : '800px', margin: "0 auto"}}>
            <h1>Add Product</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.productName.value
              const price = this.productPrice.value  
              this.props.createProduct(name, price)
            }}>
              <div className="form-group mr-sm-2" style= {{width : '600px', display: 'inline-block'}}>
                <input
                  id="productName"
                  type="text"
                  ref={(input) => { this.productName = input }}
                  className="form-control"
                  placeholder="Product Name"
                  required />
              </div>
                <br/>
              <div className="form-group mr-sm-2"  style= {{width : '600px', display: 'inline-block'}}>
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => { this.productPrice = input }}
                  className="form-control"
                  placeholder="Product Price"
                  required />
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
        )
    }

}

export default AddProduct;