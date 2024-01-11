import React, { useEffect, useState } from "react";
import Header from "../../components/Header"
import { useParams } from "react-router";
import "../../components/ShowCategoryPost.css";
import PostItemTag from "../PostItemTag";
import { Pagination, Button } from "antd";


const ShowTagPost = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [dataSource, setDataSource] = useState([]);
    const [tag, setTag] = useState([]);
    const id = useParams().id;
    const fetchData = () => {
        fetch(`https://localhost:5000/getallpostintag?Tagid=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const newData=data.sort((a,b)=>b.id-a.id)
                setDataSource(newData)
            })
    }

    const fetchTag = () => {
        fetch(`https://localhost:5000/gettag/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data1 => {
                setTag(data1.tagName)
            })
    }

    useEffect(() => {
        fetchData();
        fetchTag();
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
                <div>{tag}</div>
            </div>
            <div>
                {paginatedData.length > 0 && (
                    <>
                        {paginatedData.map(paginatedData => (
                            <p key={paginatedData.tagId}>
                                <PostItemTag data={paginatedData} />
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

export default ShowTagPost;