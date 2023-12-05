import { Link , useLocation } from 'react-router-dom';

import pokeDex from '../../assets/pokeDex.png'

import './nav.css';

function Nav () {

    const currentPage = useLocation().pathname;

    return (

        <nav className='d-flex'>

            <img className = "px-5"src={pokeDex} alt="A pokedex outline!" />

            <section id =  "navbar" className='d-flex '>

                <section id='name' className= 'pt-2 '>

                    <h1>Pokemon Team Builder</h1>

                </section>

                <section id='links' className='d-flex'>

                    <Link to="/"
                    
                        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                    
                    >Home</Link> 

                    <Link to="/teams"
                    
                        className={currentPage === '/teams' ? 'nav-link px-2 active' : ' px-2 nav-link'}
                    
                    >Teams</Link> 

                    <Link to="/login"
                    
                        className={currentPage === '/login' ? 'pe-2 nav-link active' : 'nav-link pe-2'}
                    
                    >Login</Link> 


                </section>

            </section>

        </nav>

    )
}

export default Nav;