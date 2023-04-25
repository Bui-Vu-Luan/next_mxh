import React, { useEffect } from "react";
import Link from "next/link";
import FbIcon from '../../public/images/fb_icon.png';
import GgIcon from '../../public/images/google_icon.png';

import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from "firebase/auth";
import { database } from '@/firebaseConfig/config';
import { getDatabase, ref, set, push } from "firebase/database";
import { setData, checkTokenLogin } from "@/firebaseConfig/func";
import { useRouter } from "next/router";
const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
export default function login() {
    const router = useRouter();

    const loginGoogle = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(token)
                console.log(user)
                await localStorage.setItem('token', token)
                await localStorage.setItem('accessToken', user.accessToken)

                let data_user = {
                    username: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                await setData('users/' + user.uid, data_user)

                history.back();

                // IdP data availa  ble using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const loginFacebook = () => {
        signInWithPopup(auth, providerFB)
            .then((result) => {
                // The signed-in user info.
                const user_fb = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credentialfb = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credentialfb.accessToken;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }
    useEffect(() => {
        if (checkTokenLogin()) {
            router.push('/')
        }
    }, [])
    return (
        <div>
            <div className="container_auth">
                <div className="signup-form">
                    <div className="card_auth">
                        <div className="header_auth">
                            <h2 className="title text-primary">Đăng nhập</h2>
                        </div>
                        <form>
                            <div className="form-group position-relative">
                                <i className="far fa-user icon_input_left text-grey"></i>
                                <input className="form-control has_icon_left" type="text" placeholder="Tên đăng nhập" />
                            </div>
                            <div className="form-group position-relative">
                                <i className="fa fa-key icon_input_left text-grey"></i>
                                <input className="form-control has_icon_left" type="text" placeholder="Mật khẩu" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary w-100" type="button">Đăng nhập</button>
                            </div>
                        </form>
                        <p className="text-center text-grey"><i>Hoặc đăng nhập với</i></p>
                        <div className="text-center my-2">
                            <a href={void (0)} className="social-icon pointer" onClick={() => loginFacebook()}>
                                <img src={FbIcon.src} />
                            </a>
                            <a href={void (0)} className="social-icon pointer" onClick={() => loginGoogle()}>
                                <img src={GgIcon.src} />
                            </a>
                        </div>
                        <p className="text-right">Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký ngay</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
};
