import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Modal,
    DatePicker,
    Radio,
    Upload,
    message,
    Select

} from "antd";
import dayjs from 'dayjs';
import { useNavigate, useParams } from "react-router";
import styles from "../update/UpdateCategory.module.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from "@ant-design/icons";

const UpdatePost = () => {
    const [des, setDes] = useState("")
    let navigate = useNavigate();
    const [image, setImage] = useState("")
    const showback = () => {
        navigate(`/post/${id}`);
    };
    const [form] = Form.useForm();
    const { Option } = Select;
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    const [post, setPost] = useState([]);
    const id = useParams().id;
    const fetchPost = () => {
        fetch(`https://localhost:5000/getpost/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPost(data)
            })
    }
    useEffect(() => {
        fetchPost()
    }, [])
    useEffect(() => {
        setTitleImage(post.titleImage)
    }, [post])

    const onFinish = (fieldsValue) => {

        const values = {
            ...fieldsValue,
            TitleImage: image != "" ? image : post.titleImage,
            Description : des,
        };
        axios({
            method: 'put',
            url: `https://localhost:5000/updatepost/${id}`,
            data: {
                PostTitle: values.PostTitle,
                PostDay: post.postDay,
                Specification: values.Specification,
                Description: values.Description,
                CategoryId: post.categoryId,
                UserId: post.userId,
                TitleImage: values.TitleImage,
                View: values.View,
                Status: post.status,

            },
            // headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => {
                Modal.success({
                    title: 'SAVE SUCCESSFULLY',
                    content: 'Cập nhật thành công',
                    onOk: () => { showback() }
                })
            })
            .catch(e => {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: e
                })
            });



    };
    const [titleImage, setTitleImage] = useState()
    const props = {
        name: 'upload',
        action: 'https://localhost:5000/addImage',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setImage(info.file.response.url)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    return (
        <>
            <Header />

            <Row className={styles['container']}>

                <div className={styles['content']}>
                    <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
                        Sửa bài viết
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left"
                            fields={[
                                {
                                    name: ["PostTitle"],
                                    value: post.postTitle,
                                },
                                {
                                    name: ["Specification"],
                                    value: post.specification,
                                },
                                {
                                    name: ["Description"],
                                    value: post.description,
                                },
                                {
                                    name: ["TitleImage"],
                                    value: post.titleImage,
                                },
                                {
                                    name: ["PostDay"],
                                    value: dayjs(post.postDay),
                                },
                            ]}
                        >

                            <Form.Item label="Tiêu đề bài viết" style={{ marginBottom: 20 }}
                                name="PostTitle"
                            >
                                <Input className="inputForm" />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh Tiêu đề"
                                name="TitleImage"
                            >
                                <img width={'200px'} src={post.titleImage} />
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item label="Mô tả" style={{ marginBottom: 20 }}
                                name="Specification"
                            >
                                <Input className="inputForm" />
                            </Form.Item>
                            <Form.Item label="Nội dung" style={{ marginBottom: 20 }}

                                name="Description"


                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={post.description}
                                    config={{
                                        ckfinder: {
                                            uploadUrl: 'https://localhost:5000/addImage'
                                        }
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDes(data);
                                    }}
                                />

                            </Form.Item>
                            <Form.Item label="Ngày đăng" style={{ marginBottom: 20 }}
                                name="PostDay"
                            >
                                <DatePicker
                                    style={{ display: "block" }}
                                    format="DD/MM/YYYY"
                                    placeholder=""
                                    className="inputForm"
                                />
                            </Form.Item>
                            <Form.Item shouldUpdate>
                                {() => (
                                    <Row>
                                        <Col span={3} offset={6}>
                                            <Button htmlType="submit" className="buttonSave" type="primary" >
                                                Cập nhật
                                            </Button>
                                        </Col>
                                        <Col span={3} offset={6}>
                                            <Button className="buttonCancle" onClick={showback}>Quay Lại</Button>
                                        </Col>

                                    </Row>
                                )}
                            </Form.Item>
                        </Form>
                    </Row>
                </div>
            </Row>
        </>
    );
}

export default UpdatePost