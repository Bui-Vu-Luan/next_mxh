import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { database } from '@/firebaseConfig/config';
import { ref, set, push, get, child, orderByChild, limitToLast, query, orderByValue, limitToFirst, onValue, equalTo } from "firebase/database";
import { getDownloadURL, getStorage, ref as storeRef, uploadBytes } from "firebase/storage";

function index() {
    const [memberList, setMemberList] = useState([]);
    const getUsers = () => {
        const dbRef = query(ref(database, "users"))

        onValue(dbRef, async (snapshot) => {
            if (snapshot.exists()) {
                let result = snapshot.val();
                console.log(result)
                let data_tmp = []
                for (const property in result) {
                    let arr_tmp = {
                        id: property,
                        ...result[property],
                    }
                    data_tmp.push(arr_tmp)
                }
                setMemberList(data_tmp)
            } else {
                console.log("No data available");
            }
        })
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div>
            <div className='row'>
                {memberList && memberList.map((item, index) => {
                    return (
                        <div key={item.id} className='col-sm-4'>
                            <div className='box_member'>
                                <div className='box_image_member'>
                                    <img className='img_member' src={item.photoURL} />
                                </div>
                                <p className='text-center'>{item.username}</p>
                                <div className='text-center my-2'>
                                    <button type='button' className='btn btn-outline-info '>View Profile</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default index;