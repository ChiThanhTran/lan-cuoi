import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Link } from "react-router-dom";

const PostItemTag = (props = {}) => {
    const { data } = props;
    const [cate, setCate] = useState();
    const [user, setUser] = useState();
    const [post, setPost] = useState();

    const getcategory = async () => {
        let res = await axios.get(`https://localhost:5000/getcategory/${data.categoryId}`);
        if (res) {
            setCate(res.data);
        }
    }

    const getpost = async () => {
        let res = await axios.get(`https://localhost:5000/getpost/${data.postId}`);
        if (res) {
            console.log(res.data)
            setPost(res.data);
        }
    }

    const getuser = async () => {
        let res = await axios.get(`https://localhost:5000/getuser/${post.userId}`);
        if (res) {
            setUser(res.data);
        }
    }

    useEffect(() => {
        getcategory();
        getpost();
    }, []);

    useEffect(() => {
        if (post) {
            getuser();
        }
    }, [post])

    return (
        <>
            {
                data && cate && user && (
                    <div className="parent">
                        <div className="div1"></div>
                        <div className="div2"> <img width="100%" height="200px" src={data.titleImage} /></div>
                        <div className="div3">
                            <div className="ten-cate">
                                <Link to={`/category/${data.categoryId}`}>{cate.categoryName}</Link>
                            </div>

                            <div className="tieude-baiviet">
                                <Link to={`/post/${data.postId}`}>{data.postTitle}</Link>
                            </div>
                            <div className="mota-baiviet"> {data.specification}</div>
                            <div className="ten-user"> {user.name}</div>
                        </div>
                        <div className="div4"></div>
                    </div>
                )
            }
        </>
    );
}

export default PostItemTag