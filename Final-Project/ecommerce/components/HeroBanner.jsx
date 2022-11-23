import React from 'react';
import Link from 'next/link';
import {urlFor} from '../lib/client';


const HeroBanner = ({heroBanner}) =>{
    return(
        <div className = "hero-banner-container">
            <div>
                <h1 className = "title">{heroBanner.smallText}</h1>
            
                <h2>{heroBanner.midText}</h2>
                <h1>{heroBanner.largeText1}</h1>
                
            
              
                <img src={urlFor(heroBanner.image)} alt="clothing" 
                className = "hero-banner-image" />
                <div>
                    <Link href= {`/product/${heroBanner.product}`}>
                        <button type="button"> {heroBanner.buttonText}</button>
                    </Link>
                    
                </div>
            </div>

        </div>
    )
}

export default HeroBanner