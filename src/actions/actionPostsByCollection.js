import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionPostsByCollection = (_id) =>
async (dispatch) => {
    const gqlQuery = 
    `query CollectionByUser($collectionId:String){
        CollectionFindOne(query:$collectionId){ 
            _id text owner{_id nick login avatar{_id url}} posts{_id title text images{_id url} createdAt likesCount 
            comments{_id createdAt text likesCount owner{_id nick login avatar{_id url}} answerTo{_id}} directs{text} likesCount 
            collections{_id}
            owner{_id login nick avatar{_id url}} 
            
            likes{_id owner{_id}}}
        }
    }`
        const gqlPromise = gql(gqlQuery, {"collectionId": JSON.stringify([{"_id":_id}])})
        const action = actionPromise('PostsByCollection', gqlPromise)
        await dispatch(action)
    }   

export default actionPostsByCollection
