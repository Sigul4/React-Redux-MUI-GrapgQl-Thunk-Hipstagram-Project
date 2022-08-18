import history from "../data/history"

function jwtDecode(token){
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch (e) {
    }
}

export default function authReducer(state={}, {type, token}){
    if (type === 'AUTH_LOGIN'){
        const payload = jwtDecode(token)
        if (payload)
            // console.log(payload)
            // localStorage.userId = payload.sub.id
            return {token, payload}
    }
    if (type === 'AUTH_LOGOUT'){
        // history.push('/login')
        return {}
    }
    return state
}
