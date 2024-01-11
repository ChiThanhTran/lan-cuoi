import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Header from "../components/Header"
import PostItem from "./PostItem";
import { Button, Pagination } from "antd";
import styles from "./Search.module.css"
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Search = () => {
    const search = useParams().search;
    const [dataSource, setDataSource] = useState([]);
    const [dataSource1, setDataSource1] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const fetchData = () => {
        fetch(`https://localhost:5000/getallpostbytitle?postTitle=${search}`)

            .then(response => {
                return response.json()
            })
            .then(data => {
                setDataSource(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData1 = () => {
        fetch(`https://localhost:5000/getallusersbyname?name=${search}`)

            .then(response => {
                return response.json()
            })
            .then(data => {
                setDataSource1(data)
            })
    }

    useEffect(() => {
        fetchData1()
    }, [])

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const paginatedData = dataSource.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    const paginatedData1 = dataSource1.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const inputBaiViet = useRef()
    const inputNguoiDung = useRef()

    const handleTab = (whatTab) => {
        switch (whatTab) {
            case 'bai-viet':
                inputBaiViet.current.style.display = "block"
                inputNguoiDung.current.style.display = "none"
                break
            case 'nguoi-dung':
                inputBaiViet.current.style.display = "none"
                inputNguoiDung.current.style.display = "block"
                break
        }
    }

    return (
        <>
            <Header />
            <h1> Kết quả tìm kiếm : {search}</h1>
            <div className={styles['tabs']}>
                <div onClick={() => handleTab('bai-viet')} className={styles['tab-item']}>Bài viết</div>
                <div onClick={() => handleTab('nguoi-dung')} className={styles['tab-item']}>Người dùng</div>
            </div>
            <div ref={inputBaiViet} className={styles['tab-panel-bai-viet']}>
                {paginatedData.length > 0 ?
                    <>
                        {paginatedData.map(paginatedData => (
                            <p key={paginatedData.id}>
                                <PostItem data={paginatedData} />
                            </p>
                        ))}
                        <Pagination
                            showSizeChanger
                            current={page}
                            total={dataSource.length}
                            pageSize={pageSize}
                            itemRender={itemRender}
                            pageSizeOptions={[5, 10, 15, 20]}
                            onChange={(page, pageSize) => {
                                setPage(page)
                                setPageSize(pageSize)
                            }}
                        >
                        </Pagination>
                    </>
                    : (
                        <p>Không tìm thây kết quả nào</p>
                    )
                }
            </div>
            <div ref={inputNguoiDung} className={styles['tab-panel-nguoi-dung']}>
                {paginatedData1.length > 0 ? 
                    <>
                        {paginatedData1.map(paginatedData1 => (
                            <p key={paginatedData1.id}>
                                <Avatar src={paginatedData1.image} />
                                <Link to={`/user/${paginatedData1.id}`} >{paginatedData1.name}</Link>
                            </p>
                        ))}
                        <Pagination
                            showSizeChanger
                            current={page}
                            total={dataSource1.length}
                            pageSize={pageSize}
                            itemRender={itemRender}
                            pageSizeOptions={[5, 10, 15, 20]}
                            onChange={(page, pageSize) => {
                                setPage(page)
                                setPageSize(pageSize)
                            }}
                        >
                        </Pagination>
                    </>
                    : (
                        <p>Không tìm thây kết quả nào</p>
                    )
                }
            </div>
        </>
    );
}

export default Search;