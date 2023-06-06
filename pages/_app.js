import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/responsive.css'

import "../public/font/css/all.min.css";
import Script from 'next/script'

import { Container } from 'react-bootstrap';
import NavTop from "./navTop"
import MenuLeft from "./MenuLeft"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [loadingFirst, setLodingFirst] = useState(false)
    const showHeader = router.pathname === '/auth/login' || router.pathname === '/auth/register' ? false : true;
    useEffect(() => {
        console.log(1234)
        setLodingFirst(true)

        setTimeout(() => {
            setLodingFirst(false)
        }, 3000);
    }, [])
    return (
        <div>
            <>
                {showHeader && <NavTop />}
                <div className='grid'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <MenuLeft />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
                {/* <Script src="http://localhost:3000/js/custom.js" /> */}
                {/* <script src={GlobalJS.BASE_URL + "/app-assets/js/bootstrap.min.js"} /> */}
            </>

        </div>
    )
}
