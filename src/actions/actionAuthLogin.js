import history from '../data/history.js'

const actionAuthLogin = (token) => 
(dispatch, getState) => {
    const oldState = getState().auth
    dispatch({type: 'AUTH_LOGIN', token})
    const newState = getState().auth
    if (newState !== oldState && token){
        localStorage.authToken = token
        if((history.location.pathname === '/login' || history.location.pathname === '/register') && localStorage.length !== 0){
            // history.push("/content")
        }
    }
    else alert("Такого юзера нима!")
}

export default actionAuthLogin
