import React, { useEffect, useState } from "react";
import Header from "../../components/Header"
import { useParams } from "react-router";
import "../../components/ShowCategoryPost.css"
import PostItem from "../PostItem";
import { Button, Pagination } from "antd";

const ShowCategoryPost = () => {
    
    const [dataSource, setDataSource] = useState([]);
    const [cate, setCate] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const id = useParams().id;
    const fetchData = () => {
        fetch(`https://localhost:5000/getallpostbycategory?categoryid=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData=data.sort((a,b)=>b.id-a.id)
                setDataSource(newData)
            })
    }

    const fetchCate = () => {
        fetch(`https://localhost:5000/getcategory/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data1 => {
                setCate(data1)
            })
    }

    useEffect(() => {
        fetchData();
        fetchCate();
    }, [id])
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
            <div className="tieude-cate">
                <div>{cate.categoryName}</div>
            </div>
            
            <div>
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

export default ShowCategoryPost;