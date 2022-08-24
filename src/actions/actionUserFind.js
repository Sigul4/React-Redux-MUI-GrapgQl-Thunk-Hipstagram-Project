import gql                  from "../helpers/gql"
import { actionPromise }    from "./actionPromise"


const actionUserFind = (text) =>
async (dispatch) => {
    // console.log('Работаем, проверяй...')

    const gqlQuery = 
    `query usery($users: String){
        UserFind(query:$users){
            _id login nick avatar{url}
        }
    }`
    
    const gqlPromise = await gql(gqlQuery, {"users": JSON.stringify([{"login": {"$regex": text}},{"sort": [{"createAt": -1}]}])})

    const action = actionPromise('requiredNicknames', gqlPromise) 
    await dispatch(action)
}

export default actionUserFind
