import gql from "../helpers/gql"

const actionDeleteComment = async (text, id) => {
    
    const gqlQuery = 
    `mutation NewComment($id: ID){
        CommentDelete(comment:{post:{_id:$id}}){
            _id 
        }
    }`
    const gqlPromise = gql(gqlQuery, {id:id })
    const action = await gqlPromise
    // console.log(await action)
    return await action
}

export default actionDeleteComment
