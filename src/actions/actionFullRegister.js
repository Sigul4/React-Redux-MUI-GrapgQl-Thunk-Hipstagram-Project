
import actionFullLogin  from "./actionFullLogin";
import {actionPromise}    from "./actionPromise"
import gql              from "../helpers/gql";

const actionFullRegister = (login, password) =>
async (dispatch) => {

    const gqlQuery = `mutation register($login:String!, $password:String!){
        createUser(login: $login, password: $password){
            _id
        }
    }`
    const gqlPromise = gql(gqlQuery, {login, password})
    const action     = actionPromise('register', gqlPromise) 
    const result     = await dispatch(action)
    if (result) await dispatch(actionFullLogin(login, password))
    else alert("Такого юзера нима!")
}

export default actionFullRegister
