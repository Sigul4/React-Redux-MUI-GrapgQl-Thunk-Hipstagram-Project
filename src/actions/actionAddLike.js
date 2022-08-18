import gql              from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionAddLike = (id) =>
async (dispatch, getState) => {
    
    const gqlQuery = `  mutation setLikes($id:ID, $userId:String ){
                            LikeUpsert(like: { post: {_id: $id}, user:{_id:$userId}}){
                                _id
                            }
                        }`
    const gqlPromise = gql(gqlQuery, {id: id, userId: getState().promise?.aboutMe?.payload?._id})
    const action     = actionPromise('like', gqlPromise) 
    await dispatch(action)
}

export default actionAddLike;

