import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const addNewCollection = (text, id) =>
async (dispatch) => {
    const gqlQuery = 
    `mutation CollectionUpsert($id:ID,$query:String){
        CollectionUpsert(collection:{_id: $id,text: $query}){ 
            _id owner{_id} posts{_id text owner{login}} owner{login} text
        }
    }`
        const gqlPromise = gql(gqlQuery, {"id":id, "query": text})
        const action = actionPromise('NewCollection', gqlPromise)
        console.log('dispatch',dispatch)
        await dispatch(action)
    }   

export default addNewCollection 
