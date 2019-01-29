import React, { Component } from 'react'
import Title from './Title'

export default class Cart extends Component {
  render() {
    return (
      <React.Fragment> 
        <div className="py-5">
          <div className="container">
            <Title title="Cart"/>
            <div className="row"/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
