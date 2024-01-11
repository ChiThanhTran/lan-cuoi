import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShowPost from './pages/detail/ShowPost';
import ShowCategoryPost from './pages/detail/ShowCategoryPost';
import ShowTagPost from './pages/detail/ShowTagPost';
import ShowUser from './pages/detail/ShowUser';
import ManagerCategory from './pages/manager/ManagerCategory';
import ManagerTag from './pages/manager/ManagerTag';
import ManagerPost from './pages/manager/ManagerPost';
import Register from './pages/login/Register';
import Login from './pages/login/Login';
import WritePost from './pages/WritePost';
import UpdateUser from './pages/update/UpdateUser';
import UpdateCategory from './pages/update/UpdateCategory';
import Search from './pages/Search';
import UpdatePost from './pages/update/UpdatePost';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post/:id" element={<ShowPost />} />
      <Route path="/category/:id" element={<ShowCategoryPost />} />
      <Route path="/tag/:id" element={<ShowTagPost />} />
      <Route path="/user/:id" element={<ShowUser />} />
      <Route path="/managercategory" element={<ManagerCategory />} />
      <Route path="/managertag" element={<ManagerTag />} />
      <Route path="/managerpost" element={<ManagerPost />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search/:search" element={<Search />} />
      <Route path="/writepost" element={<WritePost />} />
      <Route path="/updateuser/:id" element={<UpdateUser />} />
      <Route path="/updatecategory/:id" element={<UpdateCategory />} />
      <Route path="/updatepost/:id" element={<UpdatePost />} />
    </Routes>
  )
}
export default App;
