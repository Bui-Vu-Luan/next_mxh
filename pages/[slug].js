import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon
} from "next-share";
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton
} from "next-share";
import Image1 from '../public/images/cong-nghe-block-chain-la-gi-218x150.png';
import Image2 from '../public/images/nhung-cai-kho-khi-moi-hoc-lap-trinh-218x150.png';
import Image3 from '../public/images/phien-ban-lts-la-gi-218x150.png';
var data = [
    {
        id: 1,
        title: "Công nghệ Blockchain là gì? Tiềm năng & ứng dụng thực tế Công nghệ Blockchain là gì? Tiềm năng & ứng dụng thực tế",
        img: Image1.src,
        permalink: "cong-nghe-blockchain-la-gi"
    },
    {
        id: 2,
        title: "Những cái “khó” khi mới học lập trình",
        img: Image2.src,
    },
    {
        id: 3,
        title: "Phiên bản LTS là gì? Khi nào nên sử dụng phiên bản LTS",
        img: Image3.src,
    },
    {
        id: 4,
        title: "Công nghệ Blockchain là gì? Tiềm năng & ứng dụng thực tế",
        img: Image1.src,
    },
    {
        id: 5,
        title: "Những cái “khó” khi mới học lập trình",
        img: Image2.src,
    },
]
function slug() {
    const router = useRouter();
    const [fullPath, setFullPath] = useState('')

    console.log(router)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setFullPath(window.location.href);
        }
    }, [])
    return (
        <div>
            <Breadcrumb>
                <li className='breadcrumb-item'>
                    <Link href="/">Trang chủ</Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link href="/">Danh mục</Link>
                </li>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <div className='row'>
                <div className='col-md-8'>
                    <h5 className='title_blog'>Công nghệ Blockchain là gì? Tiềm năng & ứng dụng thực tế </h5>
                    <div className='d-flex justify-content-end'>
                        <a href={void (0)} className='badge badge-icon bg-primary f-12 mr-2'>
                            <i className="fas fa-thumbs-up"></i>
                            <span className='mx-1'>Thích</span>
                            40
                        </a>
                        <p className='f-12'>
                            <i className="fas fa-eye"></i>
                            360
                        </p>
                    </div>
                    <div>
                        content
                    </div>
                    <div>
                        <div className='box_share_btn'>
                            <FacebookShareButton url={fullPath ? fullPath : ''}>
                                <FacebookIcon size={32} round={false} />
                            </FacebookShareButton>

                            <TwitterShareButton url={fullPath ? fullPath : ''}>
                                <TwitterIcon size={32} round={false} />
                            </TwitterShareButton>

                            <LinkedinShareButton url={fullPath ? fullPath : ''}>
                                <LinkedinIcon size={32} round={false} />
                            </LinkedinShareButton>

                            <EmailShareButton url={fullPath ? fullPath : ''}>
                                <EmailIcon size={32} round={false} />
                            </EmailShareButton>

                            <TelegramShareButton url={fullPath ? fullPath : ''}>
                                <TelegramIcon size={32} round={false} />
                            </TelegramShareButton>

                            <WhatsappShareButton url={fullPath ? fullPath : ''}>
                                <WhatsappIcon size={32} round={false} />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <h5 className='bg-dark text-white text-center p-2 text-uppercase'>Bài viết tương tự</h5>
                    <div className=''>
                        {data && data.map((item, index) => {
                            return (
                                <div key={index} className="box_item_right">
                                    <Link href={{
                                        pathname: '/[slug]',
                                        query: { slug: 'my-post' },
                                    }} className="link_item_right" passHref>
                                        <img src={item.img} className="img_item_right" />
                                        <p className='text_3_line_hidden title_a'>{item.title}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default slug;