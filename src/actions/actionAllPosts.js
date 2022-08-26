import gql                  from "../helpers/gql"
import {actionFulfilled}    from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";


const actionAllPosts = (clearPosts = false) =>
async (dispatch, getState) => {
    let howMuchToSkip
    await dispatch(actionAboutMe(getState().auth.payload.sub.id))

    const posts = getState().promise?.AllPosts?.payload
    const arrOfFollows = getState().promise?.aboutMe?.payload?.following?.map(follow => follow._id)
    
    posts ? howMuchToSkip = posts.length: howMuchToSkip = 0 

    // console.log('howMuchToSkip',howMuchToSkip, posts)

    const gqlQuery = 
    `query post($query:String){
        PostFind(query:$query){
            _id title text images{_id url} createdAt likesCount comments{_id createdAt text likesCount owner{_id nick login avatar{_id url}} answerTo{_id}} directs{text} likesCount 
            owner{_id login nick avatar{_id url}} likes{_id owner{_id}}
        }
    }`
    const gqlPromise = await gql(gqlQuery, {"query":  JSON.stringify([{___owner: {$in: arrOfFollows}},{limit:[10],skip:[howMuchToSkip],sort:[{_id:-1}]}])})

    const action = !clearPosts ? posts ? actionFulfilled('AllPosts', [...posts, ...gqlPromise]) : actionFulfilled('AllPosts', gqlPromise):actionFulfilled('AllPosts', [])  
    await dispatch(action)
}

export default actionAllPosts 
