import React, { useEffect, useState } from "react";
import Header from "../components/Header"
import { Button, message, Form, Input, Select, Modal, Upload, Table, Checkbox } from 'antd';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";



const WritePost = () => {
    const Idaccount = localStorage.getItem("id");
    const [items, setItems] = useState(['']);
    const [des, setDes] = useState("")
    const [newCategoryId, setNewCategoryId] = useState('')
    const { TextArea } = Input;
    const { Option } = Select;
    const [titleImage, setTitleImage] = useState("")
    const [dataTag, setDataTag] = useState("")
    const navigate = useNavigate();
    const [checkBoxGroup, setCheckBoxGroup] = useState([])
    const [postId, setPostId] = useState(0)

    const back = () => {
        navigate(`/user/${Idaccount}`);
    };

    const handleChange = (e) => {
        setNewCategoryId(e)
    }

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
                setTitleImage(info.file.response.url)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    useEffect(() => {

        axios.get(`https://localhost:5000/getalltags`, {
        })
            .then(response => {
                setDataTag(response.data);
            })
    }, []);

    const themtag = () => {
        setIsVisible(true)
    }

    const handleCheckbox = (e, id) => {
        let check = checkBoxGroup.find(x => x == id)
        if (!e.target.checked && check) {
            setCheckBoxGroup(checkBoxGroup.filter(x => x != id))
        }
        if (e.target.checked && !check) {
            setCheckBoxGroup([...checkBoxGroup, id])
        }
    }
    const showback = () => {
        navigate(`/user/${Idaccount}`);
    };
    const addTagInPost = async () => {
        checkBoxGroup.map(async item => {
            let body = {
                tagId: item,
                postId: postId,
                tagName: "",
                postTitle: ""
            }
            // debugger
            await fetch(`https://localhost:5000/addtaginpost`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        })
        setIsVisible(false)
        showback()
    }

    const columns = [
        {
            key: "1",
            title: "",
            dataIndex: "id",
            render: (id) => (
                <Checkbox onChange={(e) => handleCheckbox(e, id)} value={id}></Checkbox>
            )
        },
        {
            key: "2",
            title: "Tên tag",
            dataIndex: "tagName",
        },
    ];
    const [isVisible, setIsVisible] = useState(false)
    const handleCancel = () => {
        setIsVisible(false)
    };
    const onFinish = (fieldsValue) => {
        let today = new Date()
        let test2 = 0

        const values = {
            ...fieldsValue,
            PostDay: today,
            UserId: Idaccount,
            View: test2,
            Description: des,
            TitleImage: titleImage
        };

        axios({
            method: 'post',
            url: `https://localhost:5000/addpost`,
            data: {
                PostTitle: values.PostTitle,
                PostDay: values.PostDay,
                Specification: values.Specification,
                Description: values.Description,
                CategoryId: newCategoryId,
                UserId: values.UserId,
                TitleImage: values.TitleImage,
                View: values.View,
            }

        }).then(response => {
            if (response) {
                setPostId(response.data.id)
                Modal.success({
                    title: 'Thêm bài viết thành công, bạn có muốn gắn thẻ tag vào bài viết không',
                    onOk: () => { themtag() },
                    onCancel: () => { back() }
                })
            }
        })
            .catch(e => {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: e
                })
            })
    };

    useEffect(() => {
        axios.get(`https://localhost:5000/getallcategories`, {
        })
            .then(response => {
                setItems(response.data);
            })
    }, []);

    return (
        <>
            <Header />
            <Form onFinish={onFinish} encType="multipart/form-data">
                <Form.Item
                    label="Tiêu đề"
                    name="PostTitle"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ảnh Tiêu đề"
                    name="TitleImage"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="Specification"
                    rules={[{  message: 'Please input your password!' }]}
                >
                    <TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                </Form.Item>
                <Form.Item label="Thể loại" style={{ marginBottom: 20 }}

                    name="Category"
                    rules={[{ required: true }]}

                >
                    <Select
                        placeholder="Category"
                        onChange={handleChange}
                    >
                        {items.map(item => (
                            <Option value={item.id} key={item.id} className="option--category__select">{item.categoryName}</Option>
                        ))}

                    </Select>

                </Form.Item>

                <Form.Item
                    label="Description"
                    name="Description"
                    rules={[{ required: true }]}
                >
                    <CKEditor
                        editor={ClassicEditor}
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đăng bài
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                visible={isVisible}
                title="Select User"
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" onClick={addTagInPost} type="primary" >
                        Save
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}
            >
                {/* <Search
                    allowClear
                    onSearch={onSearch}
                    value={searchText}
                    onChange={evt => setSearchText(evt.target.value)}
                    style={{ width: 200 }}
                /> */}

                <Table
                    columns={columns}
                    dataSource={dataTag}
                >
                </Table>

            </Modal>

        </>
    );
}

export default WritePost;