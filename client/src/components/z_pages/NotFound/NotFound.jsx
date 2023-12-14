import { useRouteError , Link } from 'react-router-dom';

import cat from '../../../assets/cat.jpg'

import './NotFound.css';

export default function ErrorPage() {

    const error =  useRouteError();

    console.error(error);

    return (

        <div className="mx-6 d-flex flex-column align-items-center">

            <h1 className="">Oooops! A {error.status} error has occured! </h1>

            <p>{error.statusText}</p>

            <img className='border' src={cat} alt="Hang in their cat!" />

            <p className="">

                Please click <Link to="/"
                    
                >here</Link> to go back to your pokemon!

            </p>

        </div>

    )

}