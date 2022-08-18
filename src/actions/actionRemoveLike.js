import gql              from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionRemoveLike = (id) =>
async (dispatch) => {

    const gqlQuery = `  mutation setUnlikes($idToDelete:ID ){
                                    LikeDelete(like: { _id: $idToDelete}){
                                        _id 
                                    }
                                }`

    const gqlPromise = gql(gqlQuery, {idToDelete: id})
    const action     = actionPromise('like', gqlPromise)
    await dispatch(action)
}

export default actionRemoveLike;

