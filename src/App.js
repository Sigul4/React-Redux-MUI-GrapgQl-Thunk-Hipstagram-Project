import { connect, Provider }                from "react-redux";
import { Redirect, Route, Router, Switch }  from 'react-router-dom';
import actionAddLike                        from "./actions/actionAddLike.js";
import actionAllPosts                       from "./actions/actionAllPosts.js";
import actionAuthLogout                     from './actions/actionAuthLogout.js';
import actionChangeProfile                  from './actions/actionChangeProfile.js';
import actionFollow                         from "./actions/actionFollow.js";
import actionFullLogin                      from "./actions/actionFullLogin";
import actionFullRegister                   from "./actions/actionFullRegister.js";
import actionUserFind                       from "./actions/actionUserFind";
import actionPostFind                       from "./actions/actionPostFind.js";
import actionProfilePosts                   from "./actions/actionProfilePosts.js";
import actionProfileCollections             from "./actions/actionProfileCollections.js";
import actionPostsByCollection              from "./actions/actionPostsByCollection.js";
import actionRemoveLike                     from "./actions/actionRemoveLike.js";
import actionUnfollow                       from "./actions/actionUnfollow.js";
import "./App.css";
import ContentPage                          from "./components/ContentPage";
import Collection                           from "./components/Collection.js";
import Header                               from "./components/Header.js";
import LoginPage                            from "./components/LoginForm.js";
import PostPage                             from "./components/PostPage.js";
import RegisterPage                         from "./components/RegisterForm.js";
import UserPage                             from './components/UserDataPage.js';
import history                              from "./data/history.js";
import store                                from "./data/store";
import deletePost                           from "./helpers/deletePost.js";

const Content = ({userStatus}) =>{
  if(userStatus !== undefined){
    return(
      <Switch className='Content' style={{paddingTop: "63px"}} >
        <Route    path="/content"         component={CPostsPage}        /> 
        <Route    path="/profile/:_id"    component={CProfilePage}      /> 
        <Route    path="/post/:_id"       component={CPostPage}         /> 
        <Route    path="/collection/:_id" component={CCollectionsPage}  /> 
        <Redirect push to="/content"  />
      </Switch>)}
  else{
    return (
      <Switch className='Content' style={{paddingTop: "63px"}} >
        <Route path="/login"         component={CLoginCategory}   ></Route>
        <Route path="/register"      component={CRegisterCategory}  /> 
        <Redirect push to="/login"  />
      </Switch>)
  }
}

const CContent          = connect(state => ({userStatus: state?.auth?.token}))  (Content)
const CLoginCategory    = connect(null,     {onLogin: actionFullLogin})       (LoginPage)
const CRegisterCategory = connect(null,     {onLogin: actionFullRegister})    (RegisterPage)
const CHeader           = connect(state => ({userNick: state?.auth?.payload?.sub?.acl[1], userId:state?.auth?.payload?.sub?.id, userData:state?.promise?.aboutMe?.payload, requiredNicknames: state?.promise?.requiredNicknames?.payload }),{Logout: actionAuthLogout,onChooseNick: actionUserFind}) (Header)
const CProfilePage      = connect(null, {onFollow: actionFollow, onUnfollow: actionUnfollow, onProfileChange:actionChangeProfile, onLoadCollection: actionProfileCollections})(UserPage)
const CPostsPage        = connect(state => ({Post: state?.promise?.AllPosts?.payload, aboutMe: state?.promise?.aboutMe?.payload}), {onPostLoad: actionAllPosts, postLike:actionAddLike, postUnlike:actionRemoveLike}) (ContentPage)
const CPostPage         = connect(state => ({post: state?.promise?.PostInf?.payload,  aboutMe: state?.promise?.aboutMe?.payload}), {onLoad:actionPostFind, postLike:actionAddLike, postUnlike:actionRemoveLike, changePostsToDelete:deletePost})(PostPage)
const CCollectionsPage  = connect(state => ({posts: state?.promise?.PostsByCollection?.payload, aboutMe: state?.promise?.aboutMe?.payload, collections: state?.promise?.ProfileCollections?.payload}), {onLoadUserPosts:actionPostsByCollection, postLike:actionAddLike, postUnlike:actionRemoveLike})(Collection)


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
