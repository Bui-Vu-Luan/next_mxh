import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar, NavDropdown, Form, Container, Offcanvas } from 'react-bootstrap';
import * as GlobalJs from "../public/js/global"
import AvatarImage from '../public/images/no_image.jpg';
import LogoImage from '../public/vercel.svg';

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { database } from '@/firebaseConfig/config';
import { ref, set, push, get, child } from "firebase/database";
import { useRouter } from 'next/router';
import { getData } from '@/firebaseConfig/func';

const auth = getAuth();

function navTop() {
    const router = useRouter();

    const [activeNav, setActiveNave] = useState('');
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [userData, setUserData] = useState([])
    const activeNavMenu = (nav_item) => {
        setActiveNave(nav_item)
    }
    const titleNavRight = (
        <>
            <img src={userData ? userData.photoURL : AvatarImage.src} width="30" />
            <span style={{ marginLeft: "12px" }}>
                {userData ? userData.username : ''}
            </span>
        </>
    );

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token')
            window.location.reload();
        }).catch((error) => {
            // An error happened.
        });
    }
    const checkLogin = () => {
        let token = localStorage.getItem('token');
        if (token) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const userId = user.uid;
                    getData(`users/${userId}`).then((snapshot) => {
                        if (snapshot.exists()) {
                            var user_data = {
                                ...snapshot.val(),
                                uid: userId,
                            }
                            setUserData(user_data)
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    // ...
                } else {
                    console.log(123)
                    // User is signed out
                    // ...
                }
            });
        }
    }
    useEffect(() => {
        var nav_top = document.querySelector('.navbar_top');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                nav_top.classList.add('shadow');
            } else {
                nav_top.classList.remove('shadow');
            }
        });
    }, [])
    useEffect(() => {
        checkLogin()

    }, [])
    useEffect(() => { // click button back browser
        router.beforePopState(({ as }) => {
            if (as !== router.asPath) {
                // Will run when leaving the current page; on back/forward actions
                // Add your logic here, like toggling the modal state
                checkLogin();
            }
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router])
    return (

        <Navbar expand={"md"} sticky={"top"} className="mb-3 navbar_top bg-white">
            <div className='grid d-flex align-items-center justify-content-between'>
                <Navbar.Brand style={{ paddingTop: "0 !important" }}>
                    <Link href={"/"}>
                        <img src={LogoImage.src} width="100" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            <Link href={"/"}>
                                <img src={LogoImage.src} width="100" />
                            </Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <div className="w-100 position-relative">
                                <Form.Control
                                    autoFocus
                                    className="w-100"
                                    placeholder="Tìm kiếm..."
                                    onChange={(e) => setKeyword(e.target.value)}
                                    value={keyword}
                                />
                                <i className="fa fa-search icon_input_right text-grey"></i>
                            </div>
                            {/* <div className=" position-relative">
                                <input className="form-control pl-2 input_css" type="text" placeholder="Họ tên của bạn" value="" />
                                <i className="fa fa-search icon_input_right"></i>
                            </div> */}
                        </Nav>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {
                                userData.length != 0 ?
                                    <NavDropdown
                                        title={titleNavRight}
                                        id={`offcanvasNavbarDropdown-expand-md`}
                                        show={open}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <a href={void (0)} onClick={() => logout()} className="dropdown-item">Đăng xuất</a>
                                    </NavDropdown> :
                                    <>
                                        <Link href={"/auth/login/"} onClick={() => activeNavMenu(4)} className={`nav_top_link nav-link ${activeNav == 4 ? 'active' : ''}`}>Đăng nhập</Link>
                                        <Link href={"/auth/register/"} onClick={() => activeNavMenu(5)} className={`nav_top_link nav-link ${activeNav == 5 ? 'active' : ''}`}>Đăng ký</Link>
                                    </>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </Navbar>

    );
}

export default navTop;