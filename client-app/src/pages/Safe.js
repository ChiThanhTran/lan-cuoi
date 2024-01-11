import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import { Button, Modal } from "antd";

const Safe = (props = {}) => {
    const { data } = props;
    const [dataSource, setDataSource] = useState();
    const Idaccount = localStorage.getItem("id");

    const fetchData = () => {
        fetch(`https://localhost:5000/getpost/${data}`)
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

    const boluu = () => {
        axios({
            method: 'delete',
            url: `https://localhost:5000/deletesafe?UserId=${Idaccount}&PostId=${data}`,
            data: {
                UserId: Idaccount,
                PostId: data,
                IsSafe: 1,
            }
        })
            .then(response => {
                Modal.success({
                    title: 'Bỏ Lưu thành công',
                    onOk: () => { window.location.reload() }
                })
            })

    }

    return (
        <>
            {
                dataSource && (
                    <div >
                        <PostItem data={dataSource} />
                        <Button onClick={boluu}>Bỏ lưu </Button>
                    </div>

                )
            }
        </>
    );
}

export default Safe