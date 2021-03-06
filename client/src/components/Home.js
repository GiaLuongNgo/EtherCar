import React, {Component} from 'react';
import svg from '../car.jpg'
import PropTypes from 'prop-types';
import "../App.css";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Home extends Component {

    render(){
        return(
            <div  >
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Products list
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            </Container>
            <br></br>
            <br></br>
            <Container  maxWidth= 'md' >
                <div className = "card-columns" >
                  
                  {this.props.products.map((product, key) => {
                    return(
                      <div key = {key} class="card" style= {{ width: '18rem', height : '28rem' }}>
                  <img src={svg} class="card-img-top" alt="..."/>
                  <div class="card-body">
                  <div class="row">
                  <h5 class=" col-sm-8 card-title">{product.name}</h5>
                  <p class="col card-text" align = 'center'>{product.price } ETH</p>
                  </div>
                  
                  <p class="card-text"> Owner:{product.owner}</p>
                  <p class="card-text">Level: {product.level }</p>
                  <p class="card-text">Speed: {product.speed } Km/h</p>
                    <div>
                    { !product.purchased
                      ?<div> 
                      <button
                          class="btn btn-info"
                          name={product.id}
                          value={product.price * 1000000000000000000}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                      : <h6>Out of stock</h6>
                    }
                    </div>
                  </div>
                </div>
                    )
                  })}
                </div>
                </Container>
                <br></br>
                <br></br>
                <br></br>
                <footer >
                  <Typography variant="h6" align="center" gutterBottom>
                    Footer
                  </Typography>
                  <br></br>
                  <br></br>
                </footer>
            </div>
           
        )
    }
}

Home.propTypes = {
  products: PropTypes.array
};

export default Home;