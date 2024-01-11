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

} from "antd";
import { useNavigate, useParams } from "react-router";
import styles from "../update/UpdateCategory.module.css"

const UpdateCategory = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();
    const [dataSource, setDataSource] = useState();
    const id = useParams().id;
    const showback = () => {
        navigate('/managercategory');
    };
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    const fetchData = () => {
        fetch(`https://localhost:5000/getcategory/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDataSource(data)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,

        };
        axios({
            method: 'put',
            url: `https://localhost:5000/updatecategory/${id}`,
            data: {
                CategoryName: values.CategoryName,
                CategoryBio: values.CategoryBio,
            }
            // headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => {
                Modal.success({
                    title: 'Sửa Thành công',
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


    return  (
        <>
            <Header />
            <Row className={styles['container']}>

                <div className={styles['content']}>
                    <Row style={{ marginBottom: "10px" }} className="fontHeaderContent">
                        Sửa thể loại
                    </Row>
                    <Row
                        style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
                    >
                        <Form
                            name="complex-form"
                            form={form} onFinish={onFinish} {...formItemLayout}
                            labelAlign="left"
                            fields={[
                                {
                                    name: ["CategoryName"],
                                    value: dataSource?.categoryName,
                                },
                                {
                                    name: ["CategoryBio"],
                                    value: dataSource?.categoryBio,
                                },
                            ]}
                        >

                            <Form.Item label="Tên thể loại" style={{ marginBottom: 20 }}
                                name="CategoryName"
                                rules={[{ required: true }]}
                            >
                                <Input  className="inputForm" />
                            </Form.Item>

                            <Form.Item label="Mô tả thể loại" style={{ marginBottom: 20 }}
                                name="CategoryBio"
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
                                                Save
                                            </Button>
                                        </Col>
                                        <Col span={3} offset={6}>
                                            <Button className="buttonCancle" onClick={showback}>Cancel</Button>
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

export default UpdateCategory