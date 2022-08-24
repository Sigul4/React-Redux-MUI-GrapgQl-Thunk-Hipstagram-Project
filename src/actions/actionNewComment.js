import gql from "../helpers/gql"

const actionNewComment = async (text, id) => {
    
    const gqlQuery = 
    `mutation NewComment($comment: String, $id: ID,){
        CommentUpsert(comment:{post:{_id:$id} text:$comment}){
            _id createdAt text likesCount owner{_id login avatar{_id, url}} answerTo{_id} post{text}
        }
    }`
    const gqlPromise = gql(gqlQuery, {comment: text, id:id })
    const action = await gqlPromise
    // console.log(await action)
    return await action
}

export default actionNewComment
