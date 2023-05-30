import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/responsive.css'

import "../public/font/css/all.min.css";
import Script from 'next/script'

import { Container } from 'react-bootstrap';
import NavTop from "./navTop"
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

            {/* <div className="loadingFirst">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>  */}
            <>
                {showHeader && <NavTop />}
                <div className='grid'>
                    <Component {...pageProps} />
                </div>
                {/* <Script src="http://localhost:3000/js/custom.js" /> */}
                {/* <script src={GlobalJS.BASE_URL + "/app-assets/js/bootstrap.min.js"} /> */}
            </>

        </div>
    )
}
