import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Button, Dropdown, Popover, Input, Modal, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "./Header.css"
import styles from "./Header.module.css";
import ChangePassword from "../pages/update/ChangePassword";

const Header = () => {
  const id = localStorage.getItem("id");
  const type = localStorage.getItem("role");
  const inputSearch = useRef()
  let navigate = useNavigate();
  const showback = () => {
    navigate('/home');
  };
  const register = () => {
    navigate('/register');
  };
  const login = () => {
    navigate('/login');
  };
  const toCate = () => {
    navigate('/managercategory');
  };
  const toTag = () => {
    navigate('/managertag');
  };
  const toPost = () => {
    navigate('/managerpost');
  };
  const writepost = () => {
    navigate('/writepost');
  };
  const toUser = () => {
    navigate(`/user/${id}`);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    let res = await axios.get("https://localhost:5000/getallcategories");
    if (res) {
      setItems(
        res.data.reduce((init, value, index) =>
          [
            ...init,
            {
              label: <NavLink to={`/category/${value.id}`}>{value.categoryName}</NavLink>,
              key: index
            }
          ], []
        )
      )
    }
  }

  const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("login")));

  const { data: loginContext, setData: setLoginContext } = useAppContext('login');

  useEffect(() => {
    if (loginContext) {
      setUserLogin(JSON.parse(localStorage.getItem("login")));
    }
  }, [loginContext])

  useEffect(() => {
    fetchData()
  }, [])

  const content = (
    <div className="user--dropdown">
      <Menu style={{ display: 'inline-block' }}>
        <Menu.Item key={0} onClick={toCate}>Thể loại</Menu.Item>
        <Menu.Item key={1} onClick={toTag}>Tag</Menu.Item>
        <Menu.Item key={2} onClick={toPost}>Bài viết</Menu.Item>
      </Menu>
    </div>
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }
  const content2 = (
    <div className="user--dropdown">
      <Menu style={{ display: 'inline-block' }}>
        <Menu.Item key={0} onClick={toUser}>Xem trang cá nhân</Menu.Item>
        <ChangePassword />
        <Menu.Item key={1} onClick={showModal}>Đăng xuất</Menu.Item>
      </Menu>

    </div>
  );

  const handleSearch = ()=>{
    navigate(`/search/${inputSearch.current.value}`)
    window.location.reload()
  }

  return (
    <>
      <div className={styles['header']}>
        <ul className={styles['menu']}>
          <li className={`${styles['menu-item']}`}>
            <Button><HomeOutlined onClick={showback} /></Button>
          </li>
          {
            type == 0
              ? <>
                <li className={styles['menu-item']}>
                  <Popover content={content} trigger={['click']}><Button>Quản lý</Button></Popover>
                </li>
              </>
              : <>
              </>

          }
          {/* <li className={styles['menu-item']}>
            <Popover content={content} trigger={['click']}><Button>Quản lý</Button></Popover>
          </li> */}
          <li className={`${styles['menu-item']} ${styles['search']}`}>
            <input className={styles['search']} ref={inputSearch} defaultValue={''}/>
            <button className={styles['button-search']} onClick={handleSearch}>Search</button>
          </li>
          <li className={`${styles['menu-item']} ${styles['cate']}`}>
            <Dropdown menu={{ items }} trigger={['click']}><Button>Thể loại</Button></Dropdown>
          </li>
          {
            userLogin
              ? <>
                <li className={styles['menu-item']} onClick={writepost}><Button>Viết bài</Button></li>
                <li className={styles['menu-item']}>
                  <Popover content={content2} trigger={['click']}><Button>{userLogin.name}</Button></Popover>
                </li>
              </>
              : <>
                <li className={styles['menu-item']} onClick={register}><Button>Đăng kí</Button></li>
                <li className={styles['menu-item']} onClick={login}><Button>Đăng nhập</Button></li>
              </>

          }
        </ul>
      </div>
      <Modal
        title="Warning!"
        visible={isModalVisible}
        okButtonProps={{
          className: "ant-btn-dangerous"
        }}
        cancelButtonProps={{
          className: "ant-btn-dangerous"
        }}
        
        onOk={handleLogout}
        onCancel={handleCancel}>
        <p>Do you want to Logout ?</p>
      </Modal>
    </>
  );
}

export default Header;