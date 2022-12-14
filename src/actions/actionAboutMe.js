import gql              from "../helpers/gql"
import {actionPromise}  from "./actionPromise"
import history          from "../data/history"       

const actionAboutMe = (_id) =>
async (dispatch, getState) => {
    
    const gqlQuery = 
    `query users($id: String){
    UserFindOne(query:$id) {
        _id nick createdAt login nick avatar{_id url} likesCount followers{_id nick} following{_id nick login avatar{_id url}} 
    }
}`
    const gqlPromise = gql(gqlQuery, {"id": JSON.stringify([{_id}])})
    if(JSON.stringify(getState().promise.aboutMe?.payload) !== JSON.stringify(await gqlPromise)){
    const action =  actionPromise('aboutMe', gqlPromise)
    await dispatch(action)}
    
    if(history?.location?.pathname === '/login' ){
        // history.push("/content")
    }
}

export default actionAboutMe
