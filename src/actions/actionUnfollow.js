import gql              from "../helpers/gql"
import actionProfileInf from "./actionProfileInf"

const actionUnfollow = (_id) =>
async (dispatch, getState) => {
    // console.log()
    const gqlQueryAllMyFollows = 
        `query userF($query:String){
            UserFindOne(query:$query){ 
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`

    const gqlFollowsPromise = gql(gqlQueryAllMyFollows, {"query": JSON.stringify([{_id:getState().promise?.aboutMe?.payload?._id}])})
        
    const preventFollows = await gqlFollowsPromise
    
    // console.log('!!!!!!!!!!!!!!!!!',JSON.stringify(preventFollows.following, preventFollows.following.length))
    preventFollows.following = preventFollows.following.filter(user => user._id !== _id)
    // console.log('======>',preventFollows.following, preventFollows.following.length)
        
    const gqlQuery = 
        `mutation setFollows($myId: String, $Id: [UserInput]){
            UserUpsert(user:{_id: $myId, following: $Id}){
                nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
            }
        }`
    await gql(gqlQuery, {"myId":getState().promise?.aboutMe?.payload?._id, "Id": preventFollows.following})
    await dispatch(actionProfileInf(_id))
    
}

export default actionUnfollow 
