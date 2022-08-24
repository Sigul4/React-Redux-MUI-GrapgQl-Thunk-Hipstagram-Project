import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionAddPostToCollection = (id, post) =>
async (dispatch, getState) => {
    const profileCollections = getState().promise?.ProfileCollections?.payload
    // console.log('profileCollections',profileCollections)


    const collection = id !== null ? id: profileCollections[0]
    // console.log('profileCollections[0]',collection._id)
    const preGqlQuery = 
    `query PreCollectionByUser($collectionQuery:String){
        CollectionFindOne(query:$collectionQuery){ 
            posts{
                _id
            } 
        }
    }`
    const postsByCollection = await gql(preGqlQuery, {"collectionQuery": JSON.stringify([{_id : collection._id}])})

    // console.log('postsByCollection','!postsByCollection.posts.includes({_id: post._id})',postsByCollection.posts,{_id: post},)

    const resultPosts = Array.isArray(postsByCollection.posts) 
                        && postsByCollection.posts.length >0 
                        && post 
        ? !postsByCollection.posts.map(previousPost => {return previousPost._id === post}).includes(true)
            ?([...postsByCollection.posts,{_id: post}])
            :postsByCollection.posts
        : [{_id: post}]
    
    // console.log('resultPosts',resultPosts)
    const gqlQuery = 
    `mutation CollectionUpsert($id:ID, $text:String, $posts:[PostInput]){
        CollectionUpsert(collection:{_id:$id,text:$text,posts:$posts}){ 
            _id owner{_id} posts{_id text owner{login}} owner{login} text
        }
    }`
        const gqlPromise = gql(gqlQuery, {"id":collection._id,"text":collection.text, "posts": resultPosts})
        const action = actionPromise('NewCollection', gqlPromise)
        // console.log('dispatch',dispatch)
        await dispatch(action)
    }   

export default actionAddPostToCollection 
