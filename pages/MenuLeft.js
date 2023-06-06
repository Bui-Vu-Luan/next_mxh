import Link from 'next/link';
import React, { useEffect, useState } from 'react';


function MenuLeft() {
    const [active, setActive] = useState('');
    return (
        <div>
            <div className='border-bottom mb-2 py-2'>
                <Link className={`d-block link_left ${active == '/' ? 'active' : ''}`} onClick={() => setActive('/')} href="/">
                    Newsfeed
                </Link>
            </div>
            <div className='border-bottom mb-2 py-2'>
                <Link className={`d-block link_left ${active == 'member' ? 'active' : ''}`} onClick={() => setActive('member')} href="/member">
                    Member
                </Link>
            </div>
        </div>
    );
}

export default MenuLeft;