import React, { useState, useEffect, createElement } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Link } from "react-router-dom";
import { Tooltip, Avatar, Form, Button, Input, Modal } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Comment } from '@ant-design/compatible';
import LikeReplyItem from "./LikeReplyItem";
const { TextArea } = Input;

const ReplyCommentItem = (props = {}) => {
    const { data } = props;
    const [reply, setReply] = useState();
    const [isVisible, setIsVisible] = useState(false)
    const handleCancel = () => {
        setIsVisible(false)
    };
    const replyCom = () => {
        setIsVisible(true)
    };
    const Idaccount = localStorage.getItem("id");
    const [form] = Form.useForm();
    const fetchData = () => {
        fetch(`https://localhost:5000/getallreplycomment?commentid=${data.id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setReply(data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const onFinish = (fieldsValue) => {
        var today = new Date()
        const values = {
            ...fieldsValue,
            UserId: Idaccount,
            CommentId: data.id,
            CreateAt: today,
        };

        axios({
            method: 'post',
            url: `https://localhost:5000/addreplycomment`,
            data: {
                UserId: values.UserId,
                Name: '',
                Image: '',
                CommentId: values.CommentId,
                CreateAt: values.CreateAt,
                Text: values.Text,
            }
        })
            .then(response => {
                Modal.success({
                    title: 'Thêm bình luận thành công',
                    onOk: () => { window.location.reload() }
                })
            })
            .catch(e => {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: e
                })
            });
    };
    return (
        <>
            <div className="parent">
                <div className="div1"></div>
                <div>
                    {reply != null && reply.length > 0 && (
                        <>
                            {reply.map(reply => (
                                <p key={reply.id}>
                                    <Comment
                                        author={<a>{reply.name}</a>}
                                        avatar={<Avatar src={reply.image} />}
                                        content={
                                            <p>
                                                {reply.text}
                                            </p>
                                        }
                                        datetime={
                                            <Tooltip >
                                                <span>{reply.createAt}</span>
                                            </Tooltip>
                                        }
                                    />
                                    <LikeReplyItem data={reply}/>
                                    <Button onClick={replyCom}>Reply </Button>,
                                    <Modal
                                        visible={isVisible}
                                        onCancel={handleCancel}
                                        footer={[
                                            <Button key="back" onClick={handleCancel}>
                                                Return
                                            </Button>,
                                        ]}>
                                        <Form form={form} onFinish={onFinish} >
                                            <Form.Item name="Text">
                                                <TextArea />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" type="primary" >
                                                    Bình luận
                                                </Button>
                                            </Form.Item>
                                        </Form>

                                    </Modal>
                                </p>

                            ))}
                        </>
                    )}
                </div>

                <div className="div4"></div>
            </div>
        </>
    );
}

export default ReplyCommentItem;