import gql                      from "../helpers/gql"
import {actionPromise}          from "./actionPromise"
import actionPostsByCollection  from "./actionPostsByCollection"
import PostWrapper from "../components/PostWrapper"

const actionDeletePostFromCollection = (collectionId, postId) =>
async (dispatch, getState) => {

    const posts = getState().promise.PostsByCollection.payload.posts
    // console.log('posts',posts)
    
    const filteredPosts = posts.filter(post => post._id !== postId).map(post => {return {"_id": post._id}})
    // console.log('filteredPosts',filteredPosts)
    const gqlQuery = 
    `mutation CollectionUpsert($id:ID, $text:String, $posts:[PostInput]){
        CollectionUpsert(collection:{_id:$id,text:$text,posts:$posts}){ 
            _id owner{_id} posts{_id text owner{login}} owner{login} text
        }
    }`
        const gqlPromise = gql(gqlQuery, {"id":collectionId, "posts": filteredPosts})
        const action = actionPromise('NewCollection', gqlPromise)
        // console.log('dispatch',dispatch)
        await dispatch(action)
    }   

export default actionDeletePostFromCollection
