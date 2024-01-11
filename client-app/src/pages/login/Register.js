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
} from "antd";
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "../update/UpdateCategory.module.css"
export default function Register() {
    let navigate = useNavigate();
    const showback = () => {
        navigate('/home');
    };
    const login = () => {
        navigate('/login');
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


    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            Gender: parseInt(fieldsValue["Gender"]),
            DateOfBirth: fieldsValue["DateOfBirth"].format("YYYY-MM-DD"),
        };
        var today = new Date()
        var ngaysinh = new Date(values.DateOfBirth)
        var pass1 = values.Password
        var pass2 = values.Password2
        if (pass1 == pass2) {
            if (ngaysinh < today) {
                axios({
                    method: 'post',
                    url: `https://localhost:5000/createuser`,
                    data: {
                        Username: values.Username,
                        Password: values.Password,
                        DateOfBirth: values.DateOfBirth,
                        Gender: values.Gender,
                        Email: values.Email,
                        Name: values.Name,
                    },
                    // headers: { Authorization: `Bearer ${token}` }
                })

                    .then(response => {
                        Modal.success({
                            title: 'Đăng kí thành công, mời bạn đăng nhập',
                            onOk: () => { login() }
                        })
                    })
                    .catch(e => {
                        Modal.error({
                            title: 'CHANGE FAILED',
                            content: e
                        })
                    });

            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Ngày sinh không thể là ngày của tương lai'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Mật khẩu không trùng khớp'
            })
        }

    };

    return (
        <Row className={styles['container']}>

            <div className={styles['content']}>
                <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
                    Đăng kí tài khoản
                </Row>
                <Row
                    style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                >
                    <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                        <Form.Item label="Tên đăng nhập" style={{ marginBottom: 20 }}

                            name="Username"
                            rules={[{ required: true }]}


                        >
                            <Input className="inputForm" />

                        </Form.Item>

                        <Form.Item label="Mật khẩu" style={{ marginBottom: 20 }}

                            name="Password"
                            rules={[{ required: true }]}

                        >
                            <Input.Password className="inputForm" />

                        </Form.Item>
                        <Form.Item label="Nhập lại Mật khẩu" style={{ marginBottom: 20 }}

                            name="Password2"
                            rules={[{ required: true }]}

                        >
                            <Input.Password className="inputForm" />

                        </Form.Item>
                        <Form.Item label="Ngày sinh" style={{ marginBottom: 20 }}

                            name="DateOfBirth"
                            rules={[{ required: true }]}

                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                            />

                        </Form.Item>
                        <Form.Item label="Gender" style={{ marginBottom: 20 }}
                            name="Gender" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="1">Female</Radio>
                                <Radio value="0">Male</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item label="Email" style={{ marginBottom: 20 }}

                            name="Email"
                            rules={[{ required: true }]}

                        >
                            <Input className="inputForm" />

                        </Form.Item>
                        <Form.Item label="Tên hiển thị" style={{ marginBottom: 20 }}

                            name="Name"
                            rules={[{ required: true }]}

                        >
                            <Input className="inputForm" />

                        </Form.Item>

                        <Form.Item shouldUpdate>
                            {() => (
                                <Row>
                                    <Col span={3} offset={6}>
                                        <Button htmlType="submit" className="buttonSave" type="primary" danger disabled={
                                            !form.isFieldsTouched(true) ||
                                            form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                                        }>
                                            Đăng kí
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
    );
}