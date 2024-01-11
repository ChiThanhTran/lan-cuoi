import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Link } from "react-router-dom";

const PostItem = (props = {}) => {
    const { data, isHorizontal } = props;
    const [cate, setCate] = useState();
    const [user, setUser] = useState();

    const getcategory = async () => {
        let res = await axios.get(`https://localhost:5000/getcategory/${data.categoryId}`);
        if (res) {
            setCate(res.data);
        }
    }

    const getuser = async () => {
        let res = await axios.get(`https://localhost:5000/getuser/${data.userId}`);
        if (res) {
            setUser(res.data);
        }
    }

    useEffect(() => {
        getcategory();
        getuser();
    }, []);

    return (
        <div className="parent">

            <div className="div1"></div>
            <div className="div2"> <img width="100%" height="200px" src={data.titleImage} /></div>
            <div className="div3">
                {
                    cate
                    && (<div className="ten-cate">
                        <Link to={`/category/${data.categoryId}`}>{cate.categoryName}</Link>
                    </div>)
                }

                <div className="tieude-baiviet">
                    <Link to={`/post/${data.id}`}>{data.postTitle}</Link>
                </div>
                <div className="mota-baiviet"> {data.specification}</div>
                {
                    user
                    && (<Link to={`/user/${user.id}`} > {user.name}</Link>)
                }
                {/* <div className="ngay-dang"> {data.postDay}</div> */}
            </div>
            <div className="div4"></div>
        </div>
    )
}

export default PostItem