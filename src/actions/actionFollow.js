import gql              from "../helpers/gql"
import {actionPromise}    from "./actionPromise"
import actionProfileInf from "./actionProfileInf"

const actionFollow = (_id) =>
async (dispatch, getState) => {

    const gqlQueryAllFollows = 
        `query userF($query:String){
            UserFindOne(query:$query){ 
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`

    const gqlFollowsPromise = gql(gqlQueryAllFollows, {"query": JSON.stringify([{_id:getState().promise?.aboutMe?.payload?._id}])})
        
    const preventFollows = await gqlFollowsPromise
    
    console.log('!!!!!!!!!!!!!!!!!',JSON.stringify(preventFollows), {_id: _id})
    if (preventFollows.following === null) preventFollows.following = []
    preventFollows.following.push({_id: _id})
    console.log(preventFollows.following)
        
    const gqlQuery = 
        `mutation setFollows($myId: String, $Id: [UserInput]){
            UserUpsert(user:{_id: $myId, following: $Id}){
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`
    await gql(gqlQuery, {"myId":getState().promise?.aboutMe?.payload?._id, "Id": preventFollows.following})
    await dispatch(actionProfileInf(_id))
}

export default actionFollow 
