import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value)=>{
          const {id, company, title, img, info, price, inCart} = value.detailProduct;
          return (
            <div className="container py-5">
              {/*title*/}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanred text-blue my-5">
                  <h2>{title}</h2>
                </div>
              </div>
              {/*end title*/}
              {/*prod info*/}
              <div className="row">
              {/*prod img*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} className="img-fluid" alt="product"/>
                </div>
                {/*prod text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h3>model: {title}</h3>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: 
                    <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price<span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    info :
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/*buttons*/}
                  <div>
                    <Link to="/">
                      <ButtonContainer>
                        back to products
                      </ButtonContainer>
                    </Link>
                    <ButtonContainer 
                      cart
                      disabled={inCart?true:false}
                      onClick={()=>{
                        value.addToCart(id)
                      }}
                    >
                        {inCart?'inCart':'add to cart'}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}
