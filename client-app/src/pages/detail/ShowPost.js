import React, { useEffect, useState, createElement } from "react";
import Header from "../../components/Header"
// import {getAll} from "../services/posts"
import axios from "axios";
import { Button, Input, Tooltip, Avatar, Form, Modal,Carousel } from "antd";
import { useParams } from "react-router";
import "../../components/ShowPost.css";
import { Link, useNavigate } from "react-router-dom";
import ReplyCommentItem from "../ReplyCommentItem";
import { LikeOutlined, LikeFilled, EyeOutlined, DislikeFilled, DislikeOutlined, SaveOutlined, SaveFilled } from "@ant-design/icons";
import { Comment } from '@ant-design/compatible';
import CommentItem from "../CommentItem";
import PostItem from "../PostItem";
const { TextArea } = Input;


const ShowPost = () => {
    const [dataSource, setDataSource] = useState([]);
    const [dataTag, setDataTag] = useState([]);
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState([]);
    const id = useParams().id;
    const Idaccount = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const [action, setAction] = useState(null);
    const [action2, setAction2] = useState(null);
    const [likes, setLikes] = useState();
    const [thich, setthich] = useState();
    const [saves, setSaves] = useState();
    const [luu, setluu] = useState();
    const [dislikes, setDislikes] = useState();
    const [isVisible, setIsVisible] = useState(false)
    const [dataPost, setDataPost] = useState([]);
    const handleCancel = () => {
        setIsVisible(false)
        setIsModalVisible(false);
    };
    const replyCom = () => {
        setIsVisible(true)
    };
    
    const tangview = (data) => {
        const newData = {
            PostTitle: data.postTitle,
            Specification: data.specification,
            Description: data.description,
            Status: data.status,
            TitleImage: data.titleImage,
            View: data.view + 1,
        }
        console.log(data)
        axios.put(`https://localhost:5000/updatepost/${id}`,newData)
    }
    const fetchData = () => {
        fetch(`https://localhost:5000/getpost/${id}`)
            .then(response => {

                return response.json()

            })
            .then(data => {
                setDataSource(data)
                tangview(data)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const fetchTag = () => {
        fetch(`https://localhost:5000/getalltaginpost?Postid=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDataTag(data)
            })
    }
    useEffect(() => {
        fetchTag()
    }, [])

    const getuser = async () => {
        if (dataSource && dataSource.length != 0) {
            let res = await axios.get(`https://localhost:5000/getuser/${dataSource.userId}`);
            if (res) {
                setUser(res.data);
            }
        }
    }

    useEffect(async () => {
        await getuser();
    }, [dataSource]);

    const getcomment = async () => {
        let res = await axios.get(`https://localhost:5000/getallcomment?postid=${id}`);
        if (res) {
            setComment(res.data);
        }
    }
    useEffect(() => {
        getcomment();
    }, [id]);
    const onFinish = (fieldsValue) => {
        var today = new Date()
        const values = {
            ...fieldsValue,
            UserId: Idaccount,
            PostId: id,
            CreateAt: today,
        };

        axios({
            method: 'post',
            url: `https://localhost:5000/addcomment`,
            data: {
                UserId: values.UserId,
                Name: '',
                Image: '',
                PostId: values.PostId,
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

    const numberuserlike = () => {
        fetch(`https://localhost:5000/getalllikepost?PostId=${id}`)
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
                url: `https://localhost:5000/addlikepost`,
                data: {
                    UserId: Idaccount,
                    PostId: id,
                    IsLikePost: 0,
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
                url: `https://localhost:5000/deletelikepost?UserId=${Idaccount}&PostId=${id}`,
                data: {
                    UserId: Idaccount,
                    PostId: id,
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
    const usersave = () => {
        fetch(`https://localhost:5000/getallsafe?UserId=${Idaccount}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if ( Array.isArray(data)){
                let found = data.find(element => element.postId == id);
                if (found) {
                    setAction2('saved')
                }
                setluu(found)
            }
            })
    }

    useEffect(() => {
        usersave()
    }, [])
    const save = () => {
        if (luu == null) {
            axios({
                method: 'post',
                url: `https://localhost:5000/addsafe`,
                data: {
                    UserId: Idaccount,
                    PostId: id,
                    IsSafe: 0,
                }

            }).then(response => {
                if (response != null) {
                    setAction2('saved')
                    usersave()
                }
            })
        } else {
            axios({
                method: 'delete',
                url: `https://localhost:5000/deletesafe?UserId=${Idaccount}&PostId=${id}`,
                data: {
                    UserId: Idaccount,
                    PostId: id,
                    IsSafe: 1,
                }

            }).then(response => {
                setAction2('')
                usersave()
            })
        }
    };
    let navigate = useNavigate();
    const showback = () => {
        navigate(`/user/${Idaccount}`);
    };
    const duyet = () =>{
        navigate( '/managerpost');
    }
    const deletepost = () => {

        fetch(`https://localhost:5000/deletepost/${id}`, {
            method: 'DELETE',

        })
            .then(function () {

                showback();
            })


    }
    const dongyduyet = () => {

        axios({
            method: 'put',
            url: `https://localhost:5000/updatepost/${id}`,
            data: {
                PostTitle: dataSource.postTitle,
                Specification: dataSource.specification,
                Description: dataSource.description,
                Status: 0,
                TitleImage: dataSource.titleImage,
                View: dataSource.view,
            }
        })

            .then(response => {
                Modal.success({
                    title: 'Duyệt Thành công',
                    onOk: () => { duyet() }
                })
            })
            .catch(e => {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: e
                })
            });


    }
    const tuchoiduyet = () => {

        axios({
            method: 'put',
            url: `https://localhost:5000/updatepost/${id}`,
            data: {
                PostTitle: dataSource.postTitle,
                Specification: dataSource.specification,
                Description: dataSource.description,
                Status: 1,
                TitleImage: dataSource.titleImage,
                View: dataSource.view,
            }
        })

            .then(response => {
                Modal.success({
                    title: 'Từ Chối Thành công',
                    onOk: () => { duyet() }
                })
            })
            .catch(e => {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: e
                })
            });


    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const [form] = Form.useForm();
    const fetchPost = () => {
        fetch(`https://localhost:5000/getallpostbyuserid?userid=${dataSource.userId}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                if ( Array.isArray(data)) {
                const newData=data.filter((a)=>a.status==0).sort((a,b)=>b.view-a.view)
                setDataPost(newData.slice(0,5))
                }
            })
    }
    useEffect(() => {
        fetchPost()
    }, [dataSource])
    console.log(dataPost)


    return (

        <>
            <Header />
            <div className="showpost">
                <div className="div1"></div>
                <div className="div2">
                    <div className="tieude-baiviet">{dataSource.postTitle}</div>
                    <div className="mota-baiviet">{dataSource.specification}</div>
                    <div className="group">
                        <div class="nut">
                            {
                                Idaccount == dataSource.userId
                                    ? <>
                                    <Link to={`/updatepost/${id}`}>
                                        <Button > Sửa</Button>
                                    </Link>
                                    <Button onClick={showModal}> Xóa</Button>
                                    </>
                                    : <>
                                    </>
                            }
                        </div>
                        <div class="nut">
                            {
                                role == 0 && dataSource.status ==2 && Idaccount != dataSource.userId
                                    ? <>
                                        <Button onClick={dongyduyet}> Duyệt</Button>
                                        <Button onClick={tuchoiduyet}> Từ Chối</Button>
                                    </>
                                    : <>
                                    </>
                            }
                        </div>
                        <img width="50px" height="50px" src={user.image} />
                    </div>
                    {
                        user
                        && <div className="tacgia"> <Link to={`/user/${user.id}`} > {user.name}</Link> </div>

                    }
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: dataSource.description }}></p>
                    </div>
                    <div className="view">
                        <EyeOutlined /> <p>{dataSource.view}</p>
                    </div>
                    <div className="save">
                        <Tooltip key="comment-basic-like" title="Like">
                            <span onClick={save}>
                                {React.createElement(action2 === 'saved' ? SaveFilled : SaveOutlined)}
                                <span className="comment-action"></span>
                            </span>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip key="comment-basic-like" title="Like">
                            <span onClick={like}>
                                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                                <span className="comment-action">{likes}</span>
                            </span>
                        </Tooltip>
                        <Tooltip key="comment-basic-dislike" title="Dislike">
                            <span onClick={dislike}>
                                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                                <span className="comment-action">{dislikes}</span>
                            </span>
                        </Tooltip>
                    </div>
                    <div className="tag">
                        {dataTag.length > 0 && (
                            <>
                                {dataTag.map(dataTag => (
                                    <p key={dataTag.postId}>
                                        <Button>
                                            <Link to={`/tag/${dataTag.tagId}`}> {dataTag.tagName}</Link>
                                        </Button>
                                    </p>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="binhluan">
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="Text">
                                <TextArea />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    Bình luận
                                </Button>
                            </Form.Item>
                        </Form>
                        {comment.length > 0 && (
                            <>
                                {comment.map(comment => (
                                    <p key={comment.id}>
                                        <Comment

                                            author={<a>{comment.name}</a>}
                                            avatar={<Avatar src={comment.image} />}
                                            content={
                                                <p>{comment.text}</p>
                                            }
                                            datetime={
                                                <Tooltip >
                                                    <span>{comment.createAt}</span>
                                                </Tooltip>
                                            }
                                        />
                                        <CommentItem data={comment} />
                                        <ReplyCommentItem data={comment} />
                                    </p>
                                ))}
                            </>
                        )}
                    </div>

                </div>
                <div className="div3"> </div>
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
                title="Warning!"
                visible={isModalVisible}
                okButtonProps={{
                    className: "ant-btn-dangerous"
                }}
                cancelButtonProps={{
                    className: "ant-btn-dangerous"
                }}

                onOk={deletepost}
                onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xóa không?</p>
            </Modal>
            <h2>Bài viết cùng tác giả</h2>
                <>
                    <Carousel className="article-hot">
                        {dataPost.map(dataPost => (
                            <p key={dataPost.id} className="article-hot-item">
                                <PostItem data={dataPost} isHorizontal={true} />
                            </p>
                        ))}
                    </Carousel>
                </>
        </>
    );
}

export default ShowPost;