import axios from "axios";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/Header";
import React from "react";
import PostItem from "../PostItem";
import { Button, Pagination } from "antd";

const ManagerPost = () => {
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    useEffect(() => {


        axios.get(`https://localhost:5000/getallpostbystatus?status=2`, {
        })
            .then(response => {
                const newData=response.data.sort((a,b)=>b.id-a.id)
                setDataSource(newData);
            })
            
    }, []);
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
    return (
        <>
            <Header />
            <article>
                <h3 className="title">
                    Danh sách bài viết
                </h3>

                {dataSource?.length > 0 && (
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
            </article>
           
        </>
    );
}

export default ManagerPost;