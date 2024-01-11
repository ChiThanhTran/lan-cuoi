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
  Checkbox,
} from "antd";
import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "../update/UpdateCategory.module.css"

export default function Login() {
  const { data: loginContext, setData: setLoginContext } = useAppContext('login');
  let navigate = useNavigate();
  const showback = () => {
    navigate('/home');
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
    };
    axios({
      method: 'get',
      url: `https://localhost:5000/login?username=${values.Username}&password=${values.Password}`,
    })

      .then(response => {
        if (response.data) {
          localStorage.setItem("login", JSON.stringify(response.data));
          localStorage.setItem("role", response.data.type);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          setLoginContext(true)
          Modal.success({
            title: 'Đăng nhập thành công',
            
            onOk: () => { showback() }
          })
        } else {
          setLoginContext(false)
          Modal.error({
            title: 'Bạn đã nhập sai tài khoản hoặc mật khẩu',
          })
        }
      })
      .catch(e => {
        setLoginContext(false)
        Modal.error({
          title: 'CHANGE FAILED',
          content: e
        })
      });



  };

  return (
    <Row className={styles['container']}>

      <div className={styles['content']}>
        <Row style={{ marginBottom: "10px", color: "#cf2338" }} className="fontHeaderContent">
          Đăng nhập
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
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Row>
                  <Col span={3} offset={6}>
                    <Button htmlType="submit" className="buttonSave" type="primary">
                      Đăng Nhập
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


