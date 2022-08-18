
import gql               from "../helpers/gql";
import actionFullLogin   from "./actionFullLogin";
import { actionPromise } from "./actionPromise";

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
    else alert("Така юзера уже есть!")
}

export default actionFullRegister
