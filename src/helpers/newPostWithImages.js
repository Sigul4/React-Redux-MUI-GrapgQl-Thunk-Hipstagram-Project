import gql  from "./gql"

const newPostWithImages = async (title, text, images, _id) => {
    console.log('images',images)
    if(!_id){
        console.log('images',images)
        const gqlQuery = 
        `mutation newPostWithImages($text:String, $title:String, $images:[ImageInput]){
            PostUpsert(post:{title: $title, text: $text, images: $images}){
                _id title text images{_id url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
            owner{_id login} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text, images})
        const action = await gqlPromise
        return action
    }
    else{
        console.log('_id',_id)
        console.log('images',images)
        const gqlQuery = 
        `mutation newPostWithImages($id:ID, $text:String, $title:String, $images:[ImageInput]){
            PostUpsert(post:{_id:$id, title: $title, text: $text, images: $images}){
                _id title text images{_id url} createdAt comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} directs{text} likesCount 
            owner{_id login} likes{_id owner{_id}}
            }
        }`
        const gqlPromise = gql(gqlQuery, {title, text, images, id:_id})
        const action = await gqlPromise
        return action
    }
}

export default newPostWithImages
