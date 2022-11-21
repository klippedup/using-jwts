import react from 'react'
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({children}) =>{
    return(
        <div className ="layout">
            <head> JS Mastery Store</head>
            <header>
                <Navbar />
            </header>
            <main className = "main-container">
              {children}
            </main>
            <Footer>

            </Footer>
        </div>
    )
}

export default Layout