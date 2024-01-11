import React, { useState, useEffect, createElement } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Link } from "react-router-dom";
import { Tooltip, Avatar, Form, Button, Input, Modal } from "antd";
import { LikeOutlined, LikeFilled, DislikeFilled, DislikeOutlined } from "@ant-design/icons";
import { Comment } from '@ant-design/compatible';
const { TextArea } = Input;

const LikeReplyItem = (props = {}) => {
    const { data } = props;
    const [reply, setReply] = useState();
    const [action, setAction] = useState(null);
    const [likes, setLikes] = useState();
    const [thich, setthich] = useState();
    const [isVisible, setIsVisible] = useState(false)
    const [dislikes, setDislikes] = useState();
    const Idaccount = localStorage.getItem("id");
    const [form] = Form.useForm();
    const [isVisible1, setIsVisible1] = useState(false)
    const suacmt = () => {
        setIsVisible1(true)
    };
    const handleCancel1 = () => {
        setIsVisible1(false)
    };

    const numberuserlike = () => {
        fetch(`https://localhost:5000/getalllikereplycomment?ReplyCommentId=${data.id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setLikes(data.length)
                let found = data.find(element => element.userId == Idaccount);
                if (found) {
                    setAction('liked')
                }
                setthich(found)
            })
    }

    useEffect(() => {
        numberuserlike()
    }, [])

    const like = () => {
        if (thich == null) {
            axios({
                method: 'post',
                url: `https://localhost:5000/addlikereplycomment`,
                data: {
                    UserId: Idaccount,
                    ReplyCommentId: data.id,
                    IsLikeReplyComment: 0,
                }

            }).then(response => {
                if (response != null) {
                    setAction('liked')
                    numberuserlike()
                }
            })
        } else {
            setAction('liked')
        }
    };
    const dislike = () => {
        if (thich != null) {
            axios({
                method: 'delete',
                url: `https://localhost:5000/deletelikereplycomment?UserId=${Idaccount}&ReplyCommentId=${data.id}`,
                data: {
                    UserId: Idaccount,
                    ReplyCommentId: data.id,
                    IsLikeReplyComment: 1,
                }

            }).then(response => {
                if (response != null) {
                    setAction('disliked')
                    numberuserlike()
                }
            })
        } else {
            setAction('')
        }
    };
    const confirm = Modal.confirm;
    function showConfirm() {
        confirm({
            title: 'Are you sure ? ',
            content: 'Do you want to delete this comment?',
            okText: 'Yes',
            onCancel() { },
            onOk: () => { xoacmt() },
        });
    }
    const xoacmt = () => {

        axios({
            method: 'delete',
            url: `https://localhost:5000/deletereplycomment/${data.id}`,
        })
            .then(function () {
                window.location.reload()
            })
    }
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
        };

        axios({
            method: 'put',
            url: `https://localhost:5000/updatereplycomment/${data.id}`,
            data: {
                UserId: data.userId,
                Name: data.name,
                Image: data.image,
                CommentId: data.commentId,
                CreateAt: data.createAt,
                Text: values.Text,
            }
        })
            .then(response => {
                Modal.success({
                    title: 'Sửa bình luận thành công',
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
            <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like}>
                    {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                    <span className="comment-action">{likes}</span>
                </span>
            </Tooltip>
            <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={dislike}>
                    {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span className="comment-action">{dislikes}</span>
                </span>
            </Tooltip>
            <div class="nut">
                {
                    Idaccount == data.userId 
                        ? <>
                            <Button onClick={suacmt}> Sửa</Button>
                            <Button onClick={showConfirm}> Xóa</Button>
                        </>
                        : <>
                        </>
                }
            </div>
            <Modal
                visible={isVisible1}
                onCancel={handleCancel1}
                footer={[
                    <Button key="back" onClick={handleCancel1}>
                        Return
                    </Button>,
                ]}>
                <Form form={form} onFinish={onFinish}
                    fields={[
                        {
                            name: ["Text"],
                            value: data.text,
                        },
                    ]} >
                    <Form.Item name="Text">
                        <TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" >
                            Sửa
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}

export default LikeReplyItem;