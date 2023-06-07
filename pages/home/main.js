import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar, NavDropdown, Form, Modal } from 'react-bootstrap';
import Image1 from '../../public/images/cong-nghe-block-chain-la-gi-218x150.png';
import Image2 from '../../public/images/nhung-cai-kho-khi-moi-hoc-lap-trinh-218x150.png';
import Image3 from '../../public/images/phien-ban-lts-la-gi-218x150.png';
import InfiniteScroll from "react-infinite-scroll-component";
import { BiGroup, BiImage, BiLockAlt, BiVideo } from "react-icons/bi";
import { RiGlobalLine } from 'react-icons/ri';
import { BsReply } from 'react-icons/bs'
import Link from 'next/link';
import { addData, getData } from "@/firebaseConfig/func";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { database } from '@/firebaseConfig/config';
import { useRouter } from 'next/router';
import * as GlobalJs from "../../public/js/global"
import { ref, set, push, get, query, onValue, limitToLast } from "firebase/database";
import { getDownloadURL, getStorage, ref as storeRef, uploadBytes } from "firebase/storage";
import ModalLikeTemplate from './ModalLike';

const storage = getStorage();
const auth = getAuth();

const STATUS_TIMELINE = [
    {
        id: 1,
        name: "Mọi người",
        icon: 'fas fa-globe-asia'
    },
    {
        id: 2,
        name: "Bạn bè",
        icon: 'fas fa-user-friends'
    },
    {
        id: 3,
        name: "Chỉ mình tôi",
        icon: 'fas fa-lock'
    },
];

function main() {
    const [userData, setUserData] = useState([])

    const [timelineStatus, setTimelineStatus] = useState(STATUS_TIMELINE[0])
    const [description, setDescription] = useState('');
    const [isSubmitTimeline, setIsSubmitTimeLine] = useState(false)
    const [open, setOpen] = useState(false);
    const [dataTimeline, setdataTimeline] = useState();
    const [imagePost, setImagePost] = useState([])
    const [videoPost, setVideoPost] = useState([])
    const [loading, setLoading] = useState(false)
    let [imgArr, setImgArr] = useState([])
    const [modalLike, setModalLike] = useState(false);
    const [postDetail, setPostDetail] = useState({});
    const handleChangeStatusTimeline = (item) => {
        setTimelineStatus(item)
        setOpen(false)
    }
    const openFileUpload = () => {
        let input_file = document.getElementById("image_upload_timeline");
        input_file.click();
    }
    const uploadFile = (event) => {
        const imageGrid = document.getElementById('image-grid-main');
        let files = event.target.files;
        if (files) {
            let video_post = [];
            let image_post = [];
            for (let i = 0; i < files.length; i++) {
                let tmp_link = URL.createObjectURL(files[i])
                files[i].tmp_link = tmp_link;
                if (files[i].type == "video/mp4") {
                    video_post.push(files[i])
                } else {
                    image_post.push(files[i])
                }
                // let div_img = document.createElement('div');
                // let img = document.createElement('img');
                // let delete_btn = document.createElement('a');
                // let delete_icon = document.createElement('i');
                // imageGrid.appendChild(div_img);
                // div_img.className = "box_image_before";
                // div_img.appendChild(img);
                // div_img.appendChild(delete_btn);
                // delete_btn.className = "btn_delete_img";
                // delete_btn.href = "javascript:void(0)";
                // delete_btn.onclick = function () {
                //     remove_image_before(i);
                // };
                // delete_btn.appendChild(delete_icon);
                // delete_icon.className = "fa fa-times"
                // img.src = tmp_link;
                // img.width = '100';
                // img.height = '80'
            }
            setImagePost(image_post)
            setVideoPost(video_post)
        }
    }
    const remove_image_before = (key) => {
        console.log(key)
    }
    const checkLogin = () => {
        let token = localStorage.getItem('token');
        if (token) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const userId = user.uid;
                    get(ref(database, `users/${userId}`)).then((snapshot) => {
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

    const handleAddPost = async () => {
        let img = [];
        if (imagePost.length != 0) {
            for (let i = 0; i < imagePost.length; i++) {
                await uploadBytes(storeRef(storage, imagePost[i].name), imagePost[i]).then((snapshot) => {
                    img.push(imagePost[i].name)
                });
            }
        }
        let data_post = {
            uid: userData.uid,
            desc: description,
            status: timelineStatus,
            created_date: GlobalJs.get_created_date(),
            images: img,
        }
        addData("posts", data_post).then(() => {
            console.log('add post success')
            setImagePost([])
            setDescription([])
            setTimelineStatus(STATUS_TIMELINE[0])
        }).catch((error) => {
            // The write failed...
        });
        console.log(data_post)
    }
    const getPosts = () => {
        const dbRef = query(ref(database, "posts"), limitToLast(20))

        onValue(dbRef, async (snapshot) => {
            if (snapshot.exists()) {
                let result = snapshot.val();
                let data_tmp = []
                for (const property in result) {
                    let image_timeline = [];
                    let video_timeline = [];
                    // check is like
                    let count_like = 0;
                    let is_like = false;
                    if (result[property].likes) {
                        // count_like = Object.keys(result[property].likes).length;
                        if (result[property].likes[auth.currentUser.uid]) {
                            is_like = true;
                        }
                        for (const keyLike in result[property].likes) {
                            if (result[property].likes[keyLike]) {
                                count_like += 1;
                            }
                        }
                    }
                    let user_info = {};
                    await getData(`users/${result[property].uid}`).then((snapshot_uid) => {
                        if (snapshot_uid.exists()) {
                            user_info = {
                                username: snapshot_uid.val().username,
                                photoURL: snapshot_uid.val().photoURL,
                                permalink: snapshot_uid.val().username,
                            }
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                    let url_image = [];
                    if (result[property].images && result[property].images.length != 0) {
                        const imgPromises = result[property].images.map((_item, _index) => {
                            return getDownloadURL(storeRef(storage, _item));
                        });
                        const urls = await Promise.all(imgPromises);
                        url_image = urls;
                    }

                    let arr_tmp = {
                        id: property,
                        is_like: is_like,
                        count_like: count_like,
                        ...result[property],
                        user_info: user_info,
                        url_image: url_image,
                    }

                    data_tmp.push(arr_tmp)
                }
                // console.log(data_tmp)
                data_tmp.reverse();
                setdataTimeline(data_tmp)
            } else {
                console.log("No data available");
            }
        })
    }
    const handleLike = (item, index) => {

        let uid = auth.currentUser.uid;
        set(ref(database, 'posts/' + item.id + "/likes/"), {
            [uid]: !item.is_like
        })
    }

    const ShowModalLike = (item) => {
        setPostDetail(item)
        setModalLike(!modalLike)
    }
    useEffect(() => {
        checkLogin()
        getPosts();
    }, [])

    return (
        <div className='main'>
            <div id='home_index_scroll' className='scroll--bar'>
                <div className="card">
                    <div className="card-body">
                        {
                            userData && userData.length != 0 ?
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className='d-flex align-items-center'>
                                                <div className="avatar">
                                                    <Link href={{
                                                        pathname: '/[slug]',
                                                        query: { slug: 'luan-vu' },
                                                    }}>
                                                        <img
                                                            src={userData.photoURL}
                                                            alt="user image"
                                                            width="32"
                                                            height="32" />
                                                        <span className="avatar-status-online"></span>
                                                    </Link>

                                                </div>

                                                <div style={{ marginLeft: "12px" }}>
                                                    <span>
                                                        {userData.username}
                                                    </span>
                                                    <NavDropdown
                                                        title={
                                                            <>
                                                                <i className={timelineStatus.icon} style={{ marginRight: "4px" }}></i>
                                                                {timelineStatus.name}
                                                            </>
                                                        }
                                                        id={`offcanvasNavbarDropdown-expand-md`}
                                                        className={`dropdown_category`}
                                                        show={open}
                                                        onToggle={(isOpen) => setOpen(isOpen)}
                                                    >
                                                        {STATUS_TIMELINE.map(
                                                            (___item, ___index) => {
                                                                return (
                                                                    <a onClick={() => handleChangeStatusTimeline(___item)}
                                                                        style={{ textTransform: 'capitalize' }}
                                                                        className="dropdown-item dropdown-item-custom d-flex align-items-center" key={___index}>
                                                                        <i className={___item.icon}></i>

                                                                        <span style={{ marginLeft: "6px" }}>{___item.name}</span>
                                                                    </a>
                                                                );
                                                            }
                                                        )}
                                                    </NavDropdown>
                                                </div>
                                            </div>

                                            <div className="mt-50">
                                                <textarea
                                                    className="form-control border-0 shadow-none"
                                                    id="user-post-textarea"
                                                    rows="3" value={description}
                                                    placeholder="Bạn muốn chia sẻ điều gì?.." onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='clearfix'></div>
                                        <div id='image-grid-main' className='image-grid'>
                                            {
                                                imagePost.length != 0 ? imagePost.map((v_img, k_img) => {
                                                    return (
                                                        <div className='box_image_before' key={k_img}>
                                                            <img src={v_img.tmp_link} width={'80'} height={'80'} />
                                                            <a className='btn_delete_img' onClick={() => remove_image_before(k_img)} href={void (0)}>
                                                                <i className='fa fa-times'></i>
                                                            </a>
                                                        </div>
                                                    )
                                                }) : null
                                            }
                                            {/* {
                                                        videoPost.length != 0 ? videoPost.map((v_video, k_video) => {
                                                            return (
                                                                <div className='box_image_before' key={k_video}>
                                                                    <img src={v_video.tmp_link} width={'80'} height={'80'} />
                                                                    <a className='btn_delete_img' onClick={() => remove_image_before(k_video)} href={void (0)}>
                                                                        <i className='fa fa-times'></i>
                                                                    </a>
                                                                </div>
                                                            )
                                                        }) : null
                                                    } */}
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex'>
                                                <a href={void (0)} onClick={() => openFileUpload()}>
                                                    <BiImage title="Upload a picture" className="cursor-pointer text-muted pt-50 mr-1 upload-custom" />
                                                    <input type="file" multiple onChange={(event) => uploadFile(event)} id="image_upload_timeline" style={{ display: "none" }} />
                                                </a>
                                            </div>
                                            {
                                                isSubmitTimeline ?
                                                    <button className="btn btn-primary" disabled>
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                        Loading..
                                                    </button>
                                                    :
                                                    <button className="btn btn-primary text--button" onClick={() => handleAddPost()}>Đăng</button>
                                            }

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='text-center'>
                                    <Link href='/auth/login'>Đăng nhập</Link> để đăng bài viết
                                </div>
                        }
                    </div>
                </div>
                {
                    dataTimeline ?
                        <InfiniteScroll
                            dataLength={dataTimeline.length}
                            // next={loadMoreTimeline}
                            // hasMore={true}
                            scrollableTarget="home_index_scroll"
                            loader={<div className="loader" key={0}>Loading ...</div>}
                        >
                            {
                                dataTimeline && dataTimeline.map((item, index) => {
                                    return (
                                        <div className='card mt-2' id={`card_post_${item.id}`} key={item.id}>
                                            <div className='card-body'>
                                                <div className="form-group">
                                                    <div className='d-flex align-items-center'>
                                                        <div className="avatar">
                                                            <Link href={{
                                                                pathname: '/[slug]',
                                                                query: { slug: 'luan-vu' },
                                                            }}>
                                                                <img
                                                                    src={item.user_info.photoURL}
                                                                    alt="user image"
                                                                    width="32"
                                                                    height="32" />
                                                                <span className="avatar-status-online"></span>
                                                            </Link>

                                                        </div>
                                                        <div style={{ marginLeft: "12px" }}>
                                                            <span>
                                                                {item.user_info.username}
                                                            </span>
                                                            <p className='time_timeline'>
                                                                <i className={item.status.icon} style={{ marginRight: "4px" }}></i>
                                                                <i>{item.status.name} - {GlobalJs.formatDateText(item.created_date)}</i></p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-2'>
                                                        {item.desc}
                                                    </div>
                                                    {
                                                        item.images && item.images.length != 0 && item.url_image.length != 0 ?
                                                            <div className='image-grid'>
                                                                {
                                                                    item.url_image.map((v_img, k_img) => {
                                                                        return (
                                                                            <div className='box_image_before' key={k_img}>
                                                                                <img src={v_img} className="image_render" />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            : null
                                                    }
                                                    <hr />
                                                    <div className='d-flex mb-2'>
                                                        <a href={void (0)} className='text-dark pointer mr-2' onClick={() => ShowModalLike(item)}>{item.count_like} lượt thích</a>
                                                        <a href={void (0)} className='text-dark pointer'>0 bình luận</a>

                                                    </div>
                                                    <div className='d-flex'>
                                                        <a href={void (0)} className={`like_btn btn ${item.is_like ? 'active' : ''}`} onClick={() => handleLike(item, index)}>
                                                            <i className={`far fa-heart`}></i>
                                                            <span>Thích</span>
                                                        </a>
                                                        <a href={void (0)} className='comment_btn btn'>
                                                            <i className="far fa-comment"></i>
                                                            <span>Bình luận</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </InfiniteScroll > : null
                }
            </div>
            {
                <ModalLikeTemplate show={modalLike} postDetail={postDetail} />
            }
        </div>
    );
}

export default main;