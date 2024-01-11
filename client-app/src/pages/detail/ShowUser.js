import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header"
import { useParams } from "react-router";
import PostItem from "../PostItem";
import { Button, Pagination } from "antd";
import "../../components/ShowUser.css";
import { useNavigate } from "react-router";
import styles from "../Search.module.css"
import Safe from "../Safe";

const ShowUser = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    const touser = () => {
        navigate(`/updateuser/${Idaccount}`);
    };
    const [dataSource, setDataSource] = useState([]);
    const [dataPost, setDataPost] = useState([]);
    const [safe, setSafe] = useState([]);
    const id = useParams().id;
    const Idaccount = localStorage.getItem("id");

    const fetchData = () => {
        console.log(id)
        fetch(`https://localhost:5000/getuser/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDataSource(data)
                console.log(data)
            })
    }
    

    const [numberpost, setNumberPost] = useState([]);
    const fetchPost = () => {
        fetch(`https://localhost:5000/getallpostbyuserid?userid=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData=data.filter((a)=>a.status==0).sort((a,b)=>b.id-a.id) 
                setDataPost(newData)
                setNumberPost(newData.length)
            })
    }

    const fetchSafe = () => {
        fetch(`https://localhost:5000/getallsafe?UserId=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData=data.sort((a,b)=>b.id-a.id)
                setSafe(newData)
            })
    }

    useEffect(() => {
        fetchData();
        fetchPost();
        fetchSafe();
    }, [id]);

    const inputBaiViet = useRef()
    const inputDaLuu = useRef()
    const handleTab = (whatTab) => {
        switch (whatTab) {
            case 'bai-viet':
                inputBaiViet.current.style.display = "block"
                inputDaLuu.current.style.display = "none"
                break
            case 'da-luu':
                inputBaiViet.current.style.display = "none"
                inputDaLuu.current.style.display = "block"
                break
        }
    }
    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const paginatedData = dataPost.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    const paginatedData1 = safe.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <>
            {dataPost.length >= 0 && safe.length >= 0 &&  (
                <>
                    <Header />
                    <div className="user">
                        <div className="profile">
                            <div className="anh">
                                <img width="100px" height="100px" src={dataSource.image} />
                            </div>
                            <div className="ten">{dataSource.name} </div>
                            <div className="email">{dataSource.email} </div>
                            <div className="follow">
                                <p> Số bài viết: {numberpost}</p>
                            </div>
                        </div>

                        <div className="post">
                            <div className={styles['tabs']}>
                                <div onClick={() => handleTab('bai-viet')} className={styles['tab-item']}>Bài viết của bạn</div>
                                {
                                    Idaccount === id && (
                                        <div onClick={() => handleTab('da-luu')} className={styles['tab-item']}>Bài viết đã lưu</div>
                                    )
                                }
                            </div>
                            {
                                dataPost.length > 0 ? <>
                            <div ref={inputBaiViet}>
                                {paginatedData.map(paginatedData => (
                                    <p key={paginatedData.id}>
                                        <PostItem data={paginatedData} />
                                    </p>
                                ))}
                                <Pagination
                                    showSizeChanger
                                    current={page}
                                    total={dataPost.length}
                                    pageSize={pageSize}
                                    itemRender={itemRender}
                                    pageSizeOptions={[5, 10, 15, 20]}
                                    onChange={(page, pageSize) => {
                                        setPage(page)
                                        setPageSize(pageSize)
                                    }}
                                >
                                </Pagination>
                            </div>
                            </>
                            : <> Bạn Chưa có bài viết nào </>
                            }
                            <div style={{ display: 'none' }} ref={inputDaLuu}>
                                {paginatedData1.map(paginatedData1 => (
                                    <p key={paginatedData1.postId}>
                                        <Safe data={paginatedData1.postId} />
                                    </p>
                                ))}
                                <Pagination
                                    showSizeChanger
                                    current={page}
                                    total={safe.length}
                                    pageSize={pageSize}
                                    itemRender={itemRender}
                                    pageSizeOptions={[5, 10, 15, 20]}
                                    onChange={(page, pageSize) => {
                                        setPage(page)
                                        setPageSize(pageSize)
                                    }}
                                >
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}

export default ShowUser;