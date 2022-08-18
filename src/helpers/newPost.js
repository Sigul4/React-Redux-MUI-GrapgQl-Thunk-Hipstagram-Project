import gql  from "./gql"

const newPost = async (title, text, _id) => {
    console.log('_id',_id)
    if (!_id){
        const gqlQuery = 
        `mutation newPost($text:String, $title:String){
            PostUpsert(post:{title: $title, text :$text}){
                _id title text images{_id url} createdAt comments{_id createdAt text likesCount owner{_id nick login avatar{_id url}} answerTo{_id}} directs{text} likesCount 
            owner{_id login nick avatar{_id url}} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text})
        const action = await gqlPromise
        return action
    }
    else{
        console.log('_id',_id)
        const gqlQuery = 
        `mutation newPost($id:ID, $text:String, $title:String){
            PostUpsert(post:{_id:$id title: $title, text :$text}){
                _id title text images{url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
                owner{_id login} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {id:_id, title, text})
        const action = await gqlPromise
        return action
            
    }
}

export default newPost
