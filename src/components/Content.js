import { connect }                  from "react-redux";
import { Switch, Redirect, Route }  from "react-router-dom";
import { CCollectionsPage }         from "./Collection.js";
import { CPostsPage }               from "./ContentPage";
import { CLoginCategory }           from "./LoginForm.js";
import { CPostPage }                from "./PostPage.js";
import { CRegisterCategory }        from "./RegisterForm.js";
import { CProfilePage }             from "./UserDataPage.js";

const Content = ({userStatus}) =>{
    if(userStatus !== undefined){
        // console.log(userStatus)
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
export const CContent = connect(state => ({userStatus: state?.auth?.token}))  (Content)
