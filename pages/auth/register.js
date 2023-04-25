import Link from "next/link";
import { useState, useEffect } from "react";
import { checkTokenLogin } from "@/firebaseConfig/func";
import { useRouter } from "next/router";

export default function register() {
    const router = useRouter();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const handleRegister = () => {
        let value_details = {
            username: Username,
            password: Password,
            email: Email,
        }
        console.log(value_details)
    }
    useEffect(() => {
        if (checkTokenLogin()) {
            router.push('/')
        }
    }, [])
    return (
        <div className="container_auth">
            <div className="signup-form">
                <div className="card_auth">
                    <div className="header_auth">
                        <h2 className="title text-primary">Đăng ký</h2>
                    </div>
                    <form>
                        <div className="form-group position-relative">
                            <i className="far fa-user icon_input_left text-grey"></i>
                            <input className="form-control has_icon_left" type="text" placeholder="Tên đăng nhập" value={Username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group position-relative">
                            <i className="fa fa-envelope icon_input_left text-grey"></i>
                            <input className="form-control has_icon_left" type="text" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group position-relative">
                            <i className="fa fa-key icon_input_left text-grey"></i>
                            <input className="form-control has_icon_left" type="text" placeholder="Mật khẩu" value={Password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100" onClick={() => handleRegister()} type="button">Đăng ký</button>
                        </div>
                    </form>
                    {/* <div className="social-icons">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-google"></i>
                    </div> */}
                    <p className="text-right">Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập ngay</Link></p>
                </div>
            </div>
        </div>
    )
};
