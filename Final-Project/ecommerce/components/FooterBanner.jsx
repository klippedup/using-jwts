import react from 'react';
import Link from 'next/link';

import {urlFor} from '../lib/client';

const FooterBanner = ({footerBanner }) =>{
    return(
        <div className="footer-banner-container">
            <div classsName="banner-desc">
                <div className ="left"></div>   
                <div className="right"></div>
            </div>
        </div>
    )
}

export default FooterBanner