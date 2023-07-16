import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';

const App = (props) => {
  console.log('App.js')
  console.log(props);
  return (
    <BrowserRouter>

      <div className='App'>

        <Header />

        <Navbar />


        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs' element={<Dialogs state={props.state.dialogsPage}/>} />
            <Route path='/profile' element={<Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} />

            {/* <Route path='/dialogs' Component={Dialogs} />
            <Route path='/profile' Component={Profile} /> */}
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
