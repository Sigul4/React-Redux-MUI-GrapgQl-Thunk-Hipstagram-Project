import gql              from "../helpers/gql"
import actionAuthLogin  from "./actionAuthLogin"
import {actionPromise}    from "./actionPromise"

const actionFullLogin = (login, password) =>
async (dispatch) => {
    const gqlQuery = `query log($login:String!, $password:String!){
                        login(login:$login, password:$password)
                    }`
    const gqlPromise = gql(gqlQuery, {login, password})
    const action     = actionPromise('login', gqlPromise) 
    const result     = await dispatch(action)
    
    dispatch(actionAuthLogin(result))
}

export default actionFullLogin;
