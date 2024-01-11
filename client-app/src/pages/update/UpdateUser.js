import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    Modal,
    DatePicker,
    Radio,
    Upload,
    message
} from "antd";
import dayjs from 'dayjs';
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "../update/UpdateCategory.module.css"

export default function UpdateUser() {
    let navigate = useNavigate();
    const [image, setImage] = useState("")
    const showback = () => {
        navigate(`/user/${id}`);
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
    const [user, setUser] = useState([]);
    const id = useParams().id;
    const fetchUser = () => {
        fetch(`https://localhost:5000/getuser/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUser(data)
            })
    }
    useEffect(() => {
        fetchUser()
    }, [])
    useEffect(() => {
        setTitleImage(user.image)
    }, [user])
    console.log(user)

    const onFinish = (fieldsValue) => {

        const values = {
            ...fieldsValue,
            Gender: parseInt(fieldsValue["Gender"]),
            DateOfBirth: fieldsValue["DateOfBirth"].format("YYYY-MM-DD"),
            Image: image != "" ? image : user.image,
        };
            axios({
                method: 'put',
                url: `https://localhost:5000/updateuser/${id}`,
                data: {
                    Name: values.Name,
                    DateOfBirth: values.DateOfBirth,
                    Gender: values.Gender,
                    Email: values.Email,
                    Phone: values.Phone,
                    Bio: values.Bio,
                    Location: values.Location,
                    Image: values.Image,
                    Type: user.type,
                    Username: user.username,
                    Password: user.password,
                    BackgroundImage: user.backgroundImage

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
                        Sửa thông tin
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left"
                            fields={[
                                {
                                    name: ["Name"],
                                    value: user.name,
                                },
                                {
                                    name: ["Bio"],
                                    value: user.bio,
                                },
                                {
                                    name: ["Email"],
                                    value: user.email,
                                },
                                {
                                    name: ["Gender"],
                                    value: `${user.gender}`,
                                },
                                {
                                    name: ["Phone"],
                                    value: user.phone,
                                },
                                {
                                    name: ["Location"],
                                    value: user.location,
                                },
                                {
                                    name: ["Image"],
                                    value: user.image,
                                },
                                {
                                    name: ["DateOfBirth"],
                                    value: dayjs(user.dateOfBirth),
                                },
                            ]}
                        >

                            <Form.Item label="Tên hiển thị" style={{ marginBottom: 20 }}
                                name="Name"
                            >
                                <Input className="inputForm" />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh Đại diện"
                                name="Image"
                            >
                                <img width={'200px'} src={titleImage}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item label="Mô tả" style={{ marginBottom: 20 }}
                                name="Bio"
                            >
                                <Input className="inputForm" />
                            </Form.Item>
                            <Form.Item label="Email" style={{ marginBottom: 20 }}

                                name="Email"


                            >
                                <Input className="inputForm" />

                            </Form.Item>
                            <Form.Item label="Ngày sinh" style={{ marginBottom: 20 }}
                                name="DateOfBirth"
                            >
                                <DatePicker
                                    style={{ display: "block" }}
                                    format="DD/MM/YYYY"
                                    placeholder=""
                                    className="inputForm"
                                />
                            </Form.Item>
                            <Form.Item label="Gender" style={{ marginBottom: 20 }}
                                name="Gender" >
                                <Radio.Group>
                                    <Radio value="1">Female</Radio>
                                    <Radio value="0">Male</Radio>
                                </Radio.Group>

                            </Form.Item>
                            <Form.Item label="Số điện thoại" style={{ marginBottom: 20 }}

                                name="Phone"


                            >
                                <Input className="inputForm" />

                            </Form.Item>
                            <Form.Item label="Địa chỉ" style={{ marginBottom: 20 }}

                                name="Location"
                            >
                                <Input className="inputForm" />

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