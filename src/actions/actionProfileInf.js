import gql                from "../helpers/gql"
import {actionPromise}    from "./actionPromise"

const actionProfileInf = (_id) =>
async (dispatch) => {
  const gqlQuery = 
  `query users($id: String){
    UserFindOne(query:$id) {
      _id nick createdAt login nick avatar{url} likesCount followers{_id} following{_id}
    }
  }`
    const gqlPromise = gql(gqlQuery, {"id": JSON.stringify([{_id}])})
    const action = actionPromise('ProfileInf', gqlPromise)
    await dispatch(action)
  }

export default actionProfileInf 
