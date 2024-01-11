import React, { useState, useEffect, createElement } from "react";
import axios from "axios";
import "../components/PostItem.css";
import { Tooltip, Avatar, Form, Button, Input, Modal } from "antd";
import { LikeOutlined, LikeFilled, DislikeFilled, DislikeOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const CommentItem = (props = {}) => {
    const { data } = props;
    const [action, setAction] = useState(null);
    const [likes, setLikes] = useState();
    const [thich, setthich] = useState();
    const [isVisible, setIsVisible] = useState(false)
    const [isVisible1, setIsVisible1] = useState(false)
    const handleCancel = () => {
        setIsVisible(false)
    };
    const replyCom = () => {
        setIsVisible(true)
    };
    const handleCancel1 = () => {
        setIsVisible1(false)
    };
    const suacmt = () => {
        setIsVisible1(true)
    };
    const Idaccount = localStorage.getItem("id");
    const [form] = Form.useForm();
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
    const onFinish1 = (fieldsValue) => {
        const values = {
            ...fieldsValue,
        };

        axios({
            method: 'put',
            url: `https://localhost:5000/updatecomment/${data.id}`,
            data: {
                UserId: data.userId,
                Name: data.name,
                Image: data.image,
                CommentId: data.id,
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
    const numberuserlike = () => {
        fetch(`https://localhost:5000/getalllikecomment?CommentId=${data.id}`)
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
                url: `https://localhost:5000/addlikecomment`,
                data: {
                    UserId: Idaccount,
                    CommentId: data.id,
                    IsLikeComment: 0,
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
                url: `https://localhost:5000/deletelikecomment?UserId=${Idaccount}&CommentId=${data.id}`,
                data: {
                    UserId: Idaccount,
                    CommentId: data.id,
                    IsLikePost: 1,
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
            method: 'put',
            url: `https://localhost:5000/updatecomment/${data.id}`,
            data: {
                UserId: data.userId,
                Name: data.name,
                Image: data.image,
                PostId: data.postId,
                CreateAt: data.createAt,
                Text: '[Đã Xóa]'
            }
            // headers: { Authorization: `Bearer ${token}` }
        })
            .then(function () {
                window.location.reload()
            })



    }
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
                    <span className="comment-action"></span>
                </span>
            </Tooltip>
            <Button key="comment-basic-reply-to" onClick={replyCom}>Reply </Button>,
            <div class="nut">
                {
                    Idaccount == data.userId && data.text != "[Đã Xóa]"
                        ? <>
                            <Button onClick={suacmt}> Sửa</Button>
                            <Button onClick={showConfirm}> Xóa</Button>
                        </>
                        : <>
                        </>
                }
            </div>
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
            <Modal
                visible={isVisible1}
                onCancel={handleCancel1}
                footer={[
                    <Button key="back" onClick={handleCancel1}>
                        Return
                    </Button>,
                ]}>
                <Form form={form} onFinish={onFinish1}
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

export default CommentItem;