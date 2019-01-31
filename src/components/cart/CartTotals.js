import React from 'react'
import {Link} from 'react-router-dom'

export default function CartTotals({value}) {
  const{cartSubTotal,clearCart} = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button 
                  className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                  type="button"
                  onClick={()=>clearCart()}                
                >
                clear cart
              </button>
            </Link>
            <h4>Total price : {cartSubTotal}$</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
