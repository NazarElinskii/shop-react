import React, { Component } from 'react'
import{storeProducts, detailProduct} from './data'

const ProductContext=React.createContext();//provider
const ProductConsumer=ProductContext.Consumer;//consumer


class ProductProvider extends Component {
  state={
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
    cartSubTotal:0,//price
    cartTax:0,
    cartTotal:0

  };

  componentDidMount(){
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts=[];
    storeProducts.forEach(item =>{
      const singleItem = {...item};
      tempProducts = [...tempProducts,singleItem];
      
    })

    this.setState(()=>{
      return {products:tempProducts}
    })
  }

  getItem=(id)=>{
    const product = this.state.products.find((item)=> item.id === id);
    return product;
  }

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(()=>{
      return {
        detailProduct:product
      }
    })
  }

  addToCart = (id) => {
    let tempProducts=[...this.state.products];
    const index=tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart =true;
    product.count=1;
    const price = product.price;
    product.total = price;
    this.setState(()=>{
      return {
        products:tempProducts,
        cart:[...this.state.cart,product]
      }
    },()=>{this.addItemTotal()})
  }

  openModal=(id)=>{
    const product = this.getItem(id);
    this.setState(()=>{
      return {
        modalProduct:product,
        modalOpen:true
      }
    })
  }

  closeModal=()=>{
    this.setState(()=>{
      return {
        modalOpen:false
      }
    })
  }

  inc=(id)=>{
    let tempCart=[...this.state.cart];
    const selectedProd = tempCart.find(item=>item.id===id);
    let index=tempCart.indexOf(selectedProd);
    const product=tempCart[index];

    product.count=product.count + 1;
    product.total=product.count * product.price;
    
    this.setState(()=>{
      return{
        cart:[...tempCart]
      }
    },()=>{this.addItemTotal()})
  }
  
  dec=(id)=>{
    let tempCart=[...this.state.cart];
    const selectedProd = tempCart.find(item=>item.id===id);
    let index=tempCart.indexOf(selectedProd);
    const product=tempCart[index];

    product.count=product.count - 1;
    if(product.count===0){  
      this.removeItem(id);
    }else{
      product.total=product.count * product.price;
      this.setState(()=>{
        return{
          cart:[...tempCart]
        }
      },()=>{this.addItemTotal()})
    }
  }

  removeItem=id=>{
    let tempProducts=[...this.state.products];
    let tempCart=[...this.state.cart];
    tempCart=tempCart.filter( item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProd = tempProducts[index];
    removedProd.inCart=false;
    removedProd.count=0;
    removedProd.total=0;
    this.setState(()=>{
      return {
        cart:[...tempCart],
        products:[...tempProducts]
      }
    },()=>{
      this.addItemTotal();
    })
  }

  clearCart=(id)=>{
    this.setState(()=>{
      return {
        cart:[]
      }
    },()=>{
      this.setProducts();
      this.addItemTotal();
    })
  }

  addItemTotal=()=>{
    let subTotal=0;
    this.state.cart.map(item=>(subTotal +=item.total));
    this.setState(()=>{
      return {
        cartSubTotal:subTotal
      }
    })
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,//берем все свойства из state={...}
        handleDetail:this.handleDetail,
        addToCart:this.addToCart,
        openModal:this.openModal,
        closeModal:this.closeModal,
        inc:this.inc,
        dec:this.dec,
        removeItem:this.removeItem,
        clearCart:this.clearCart

      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}


export {ProductProvider,ProductConsumer};