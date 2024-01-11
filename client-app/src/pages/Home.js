import React, { useEffect, useState } from "react";
import Header from "../components/Header"
import PostItem from "./PostItem";
import { Button, Pagination, Carousel } from 'antd'; 

const Home = () => {
    const [dataSource, setDataSource] = useState([]);
    const [dataSource2, setDataSource2] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const fetchData = () => {
        fetch("https://localhost:5000/getallpostbystatus?status=0")
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData = data.sort((a, b) => b.id - a.id)
                setDataSource(newData)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData2 = () => {
        fetch("https://localhost:5000/getallpostbystatus?status=0")
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData = data.sort((a, b) => b.view - a.view)
                setDataSource2(newData.slice(0, 5))
            })
    }
    useEffect(() => {
        fetchData2()
    }, [])
    const item = localStorage.getItem("name");
    const paginatedData = dataSource.slice(
        (page - 1) * pageSize,
        page * pageSize
    );
    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    return (

        <>
            <Header />
            <div>
                <h1>Top bài viết nổi bật</h1>
                <>
                    <Carousel className="article-hot">
                        {dataSource2.map(dataSource2 => (
                            <p key={dataSource2.id} className="article-hot-item">
                                <PostItem data={dataSource2} isHorizontal={true} />
                            </p>
                        ))}
                    </Carousel>
                </>
                <h1>Danh sách bài viết</h1>
                {paginatedData.length > 0 && (
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
                )}
            </div>

        </>
    );
}

export default Home;