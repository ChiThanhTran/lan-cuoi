import axios from "axios";
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { CloseCircleTwoTone, EditTwoTone, FilterFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import React from "react";
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
    Table,
    Space,
} from "antd";
const ManagerTag = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    useEffect(() => {
        setLoading(true);

        axios.get(`https://localhost:5000/getalltags`, {
        })
            .then(response => {
                setDataSource(response.data);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const columns = [
        {
            key: "1",
            title: "Tên Tag",
            dataIndex: "tagName",
            sorter: (a, b) => {
                if (a.tagName > b.tagName) {
                    return -1;
                }
                if (b.tagName > a.tagName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "2",
            title: "",
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <CloseCircleTwoTone twoToneColor="#d42a2a" onClick={() => showConfirm(id)} />
                </Space>
            )
        },
    ];
    const confirm = Modal.confirm;
    function showConfirm(id) {
        confirm({
            title: 'Are you sure ? ',
            content: 'Do you want to delete this Tag?',
            okText: 'Yes',
            onCancel() { },
            onOk: () => { deletetag(id) },
        });
    }
    const deletetag = (id) => {

        fetch(`https://localhost:5000/deletetag/${id}`, {
            method: 'DELETE',

        })
            .then(function () {
                setDataSource(dataSource.filter(tag => tag.id !== id))
            })


    }
    const [isVisible, setIsVisible] = useState(false)
    const handleCancel = () => {
        setIsVisible(false)
    };
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,

        };
        var count = 0;

        dataSource.forEach(i => {
            if (fieldsValue.TagName === i.tagName)
                count++
        })
        if (count === 0) {

            axios({
                method: 'post',
                url: `https://localhost:5000/addtag`,
                data: {
                    TagName: values.TagName,
                }
                // headers: { Authorization: `Bearer ${token}` }
            })

                .then(response => {
                    Modal.success({
                        title: 'Tạo Thành công',
                        onOk: () => {
                            axios.get(`https://localhost:5000/getalltags`, {
                            })
                                .then(response => {
                                    setDataSource(response.data);
                                })
                                
                            handleCancel()
                        }
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
                content: 'Tên Tag đã tồn tại, vui lòng chọn tên khác'
            })
        }


    };
    const showModal = () => {
        setIsVisible(true)
    }


    return (
        <>
            <Header />
            <article>
                <h3 className="title">
                    Danh sách Tag
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="extension">
                                <div className="search">
                                    <a onClick={showModal} className="btn btn-danger">Thêm Tag</a>
                                </div>
                            </div>
                            <div className="table-responsive-sm">
                                <Table
                                    loading={loading}
                                    columns={columns}
                                    dataSource={dataSource}
                                >
                                </Table>
                            </div>
                        </div>
                    ) : <p>No asset to display</p>
                }
            </article>
            <Modal
                visible={isVisible}
                title="Thêm Tag"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <Row>
                    <div className="content">

                        <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >

                            <Form.Item label="Tên" style={{ marginBottom: 20 }}
                                name="TagName"
                                rules={[{ required: true }]}
                            >
                                <Input className="inputForm" />
                            </Form.Item>
                            <Form.Item shouldUpdate>
                                {() => (
                                    <Row>
                                        <Col span={3} offset={6}>
                                            <Button htmlType="submit" className="buttonSave" type="primary">
                                                Tạo
                                            </Button>
                                        </Col>
                                        <Col span={3} offset={6}>
                                            <Button className="buttonCancle" onClick={handleCancel}>Quay Lại</Button>
                                        </Col>

                                    </Row>
                                )}
                            </Form.Item>
                        </Form>

                    </div>
                </Row>
            </Modal>

        </>
    );
}

export default ManagerTag;