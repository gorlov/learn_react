import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Navbar from './components/Navigation/Navigation';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';

const App = (props) => {
  console.log('App.js')
  console.log(props);
  return (
    // <BrowserRouter>

      <div className='App'>

        <HeaderContainer />

        <Navbar />


        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs/:id?' element={<DialogsContainer />} />

            <Route path='/profile/:uid?' element={<ProfileContainer />} />

            <Route path='/users' element={<UsersContainer /> } />

            {/* <Route path='/dialogs' Component={Dialogs} />
            <Route path='/profile' Component={Profile} /> */}
          </Routes>

        </div>

      </div>
    // </BrowserRouter>
  );
}

export default App;
