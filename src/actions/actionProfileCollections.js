import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionProfileCollections = (_id) =>
async (dispatch) => {
    const gqlQuery = 
    `query CollectionsByUser($query:String){
        CollectionFind(query:$query){ 
            _id text owner{_id nick login avatar{url}} posts{_id text images{_id url} owner{_id nick login avatar{url}}} 
        }
    }`
        const gqlPromise = gql(gqlQuery, {"query": JSON.stringify([{___owner:{$in: [_id]}}, {sort: [{_id: -1}], limit: [50]}])})
        const action = actionPromise('ProfileCollections', gqlPromise)
        await dispatch(action)
    }   

export default actionProfileCollections 
