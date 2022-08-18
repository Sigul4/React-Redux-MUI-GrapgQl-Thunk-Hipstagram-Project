import gql               from "../helpers/gql"
import { actionPromise } from "./actionPromise"


const actionPostFind = (_id) =>
async (dispatch) => {

    const gqlQuery = 
    `query post($id: String){
        PostFindOne(query:$id){
            _id title text images{_id url} createdAt comments{_id createdAt text likesCount owner{_id nick login avatar{_id url}} answerTo{_id}} directs{text} likesCount 
            owner{_id login nick avatar{_id url}} likes{_id owner{_id}}
        }
    }`
    const gqlPromise = await gql(gqlQuery, {"id": JSON.stringify([{_id}])})

    const action = actionPromise('PostInf', gqlPromise) 
    await dispatch(action)
}

export default actionPostFind
