const actionAuthLogout = () => 
(dispatch) => {        
    dispatch({type: 'AUTH_LOGOUT'})
    localStorage.clear()
}

export default actionAuthLogout
