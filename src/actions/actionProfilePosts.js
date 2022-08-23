import gql                  from "../helpers/gql"
import {actionFulfilled}    from "./actionPromise"
import actionAboutMe        from "../actions/actionAboutMe";

const actionProfilePosts = (_id, clear) =>
async (dispatch,getState) => {
    console.log('actionProfilePosts')
    let howMuchToSkip
    let posts = getState().promise?.ProfilePosts?.payload
    
    if(clear){
        posts = false
        console.log('posts',posts)
    }
    // if (posts) console.log('posts[0]',posts[0]?.owner?.login === getState().promise.ProfileInf.payload.login)
    // const userLogin =  
    // if(getState().promise.ProfileInf.payload.login === posts[0].owner.login) console.log('getState()')
    
    posts ? howMuchToSkip = posts.length: howMuchToSkip = 0 
    
    console.log('howMuchToSkip',howMuchToSkip, posts)

    await dispatch(actionAboutMe(getState().auth.payload.sub.id))

    const gqlQuery = 
    `query PostFind($query:String){
        PostFind(query:$query){
            _id title text images{_id url} createdAt likesCount comments{_id createdAt text likesCount owner{_id nick login avatar{_id url}} answerTo{_id}} directs{text} likesCount 
            owner{_id nick login avatar{_id url}} likes{_id owner{_id}}
            }
        }
        `
    const gqlPromise = await gql(gqlQuery, {query: JSON.stringify([{___owner: {$in: [_id]}}, {limit:[4],skip:[howMuchToSkip],sort: [{_id: -1}]}])})
    const action = posts? actionFulfilled('ProfilePosts', [...posts, ...gqlPromise]) : actionFulfilled('ProfilePosts', gqlPromise) 
    await dispatch(action)
} 

export default actionProfilePosts
