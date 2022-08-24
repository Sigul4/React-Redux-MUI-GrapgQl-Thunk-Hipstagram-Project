import gql from './gql.js';

const deletePost = async (_id) => {
    // console.log(_id)
    const gqlQuery = 
    `mutation deletePost($idToDelete:ID ){
        PostDelete(post: { _id: $idToDelete}){
            _id title text images{url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
                owner{_id login} likes{_id owner{_id}}
        }
    }`

    const gqlPromise = gql(gqlQuery, {idToDelete: _id})
    const action     = await gqlPromise
    return await action
}

export default deletePost
