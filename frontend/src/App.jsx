import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Help from './pages/Help';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import MyRoutes from './pages/MyRoutes';
import Header from './components/Header';
import Map from './pages/Map';
import PrivateRoute from './components/PrivateRoute';
import Map2 from './pages/Map2';

export default function App() {
  return (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/HOME' element={<Home/>}/>
      <Route path='/HELP' element={<Help/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route element={<PrivateRoute />}>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/MyRoutes' element={<MyRoutes/>}/>
        <Route path='/MAP' element={<Map />}/>
        <Route path='/update/:tripId' element={<Map2 />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
