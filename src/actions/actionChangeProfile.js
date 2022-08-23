import actionAboutMe from "../actions/actionAboutMe";
import gql           from "../helpers/gql";

console.log('userInfo')

const actionChangeProfile = (avatar, nick) =>
async (dispatch, getState) => {
    console.log('userInfo',getState())
    let userInfo = getState().promise.aboutMe.payload

    if(!avatar) avatar = userInfo.avatar?._id
    if(!nick) nick = userInfo.nick

    const gqlQuery = 
    `  mutation setAvatar($id: String, $avatar: ID, $nick: String){
        UserUpsert(user:{_id: $id, avatar:{_id: $avatar}, nick: $nick}){
            _id login nick avatar{url}
        }
    }`

    const gqlPromise = await gql(gqlQuery, {id: userInfo._id, avatar: avatar, nick: nick })
    await gqlPromise

    console.log('dispatch',dispatch)
    await dispatch(actionAboutMe)
}

export default actionChangeProfile 
