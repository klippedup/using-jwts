import React from 'react'
import { Product, Footerbanner, HeroBanner} from '../components';
const Home = () => {
  return (
    <>
    <HeroBanner/>

    <div className = "products-heading">
      <h2>Best Selling Products</h2>
      <p>Hottest Fabrics</p>
    </div>
    
    <div className="products-container">
     {['product 1' , 'product 2'].map(
      (product) => product)}
    </div>

   

    </>
  )

}

export default Home;