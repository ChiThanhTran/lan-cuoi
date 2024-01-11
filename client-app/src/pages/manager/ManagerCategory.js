
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
import UpdateCategory from "../update/UpdateCategory";
const ManagerCategory = () => {
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

        axios.get(`https://localhost:5000/getallcategories`, {
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
            title: "Tên thể loại",
            dataIndex: "categoryName",
            sorter: (a, b) => {
                if (a.categoryName > b.categoryName) {
                    return -1;
                }
                if (b.categoryName > a.categoryName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "2",
            title: "Mô tả Thể loại",
            dataIndex: "categoryBio",
            sorter: (a, b) => {
                if (a.categoryBio > b.categoryBio) {
                    return -1;
                }
                if (b.categoryBio > a.categoryBio) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "3",
            title: "",
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <Link to={`/updatecategory/${id}`}>
                        <EditTwoTone twoToneColor="#52cbff"  />
                    </Link>
                    <CloseCircleTwoTone twoToneColor="#d42a2a" onClick={() => showConfirm(id)} />
                </Space>
            )
        },
    ];
    const confirm = Modal.confirm;
    function showConfirm(id) {
        confirm({
            title: 'Are you sure ? ',
            content: 'Do you want to delete this Category?',
            okText: 'Yes',
            onCancel() { },
            onOk: () => { deletecategory(id) },
        });
    }
    const deletecategory = (id) => {

        fetch(`https://localhost:5000/deletecategory/${id}`, {
            method: 'DELETE',

        })
            .then(function () {
                setDataSource(dataSource.filter(category => category.id !== id))
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
            if (fieldsValue.CategoryName === i.categoryName)
                count++
        })
        if (count === 0) {

            axios({
                method: 'post',
                url: `https://localhost:5000/addcategory`,
                data: {
                    CategoryName: values.CategoryName,
                    CategoryBio: values.CategoryBio,
                }
                // headers: { Authorization: `Bearer ${token}` }
            })

                .then(response => {
                    Modal.success({
                        title: 'Tạo Thành công',
                        onOk: () => {
                            axios.get(`https://localhost:5000/getallcategories`, {
                            })
                                .then(response => {
                                    setDataSource(response.data);
                                })
                                .catch(err => {
                                
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
                content: 'Tên thể loại đã tồn tại, vui lòng chọn tên khác'
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
                    Danh sách thể loại
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="extension">
                                <div className="search">
                                    <a onClick={showModal} className="btn btn-danger">Thêm thể loại</a>
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
                title="Thêm thể loại"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <div>
                    <Form name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >
                        <Form.Item label="Tên" style={{ marginBottom: 20 }}
                            name="CategoryName"
                            rules={[{ required: true }]}
                        >
                            <Input className="inputForm" />
                        </Form.Item>

                        <Form.Item label="Mô tả" style={{ marginBottom: 20 }}

                            name="CategoryBio"
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
            </Modal>
        </>
    );
}

export default ManagerCategory;