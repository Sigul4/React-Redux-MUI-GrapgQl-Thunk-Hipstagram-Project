import { connect, Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import "./App.css";
import { CCollectionsPage } from "./components/Collection.js";
import { CContent } from "./components/Content.js";
import { CPostsPage } from "./components/ContentPage";
import { CHeader } from "./components/Header.js";
import { CLoginCategory } from "./components/LoginForm.js";
import { CPostPage } from "./components/PostPage.js";
import { CRegisterCategory } from "./components/RegisterForm.js";
import { CProfilePage } from './components/UserDataPage.js';
import history from "./data/history.js";
import store from "./data/store";



// const Content = ({userStatus}) =>{
//   if(userStatus !== undefined){
//     return(
//       <Switch className='Content' style={{paddingTop: "63px"}} >
//         <Route    path="/content"         component={CPostsPage}        /> 
//         <Route    path="/profile/:_id"    component={CProfilePage}      /> 
//         <Route    path="/post/:_id"       component={CPostPage}         /> 
//         <Route    path="/collection/:_id" component={CCollectionsPage}  /> 
//         <Redirect push to="/content"  />
//       </Switch>)}
//   else{
//     return (
//       <Switch className='Content' style={{paddingTop: "63px"}} >
//         <Route path="/login"         component={CLoginCategory}   ></Route>
//         <Route path="/register"      component={CRegisterCategory}  /> 
//         <Redirect push to="/login"  />
//       </Switch>)
//   }
// }
// const CContent          = connect(state => ({userStatus: state?.auth?.token}))  (Content)



const App = () =>
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <CHeader />
          <CContent/>
        </div>
      </Provider>
    </Router>

export default App
