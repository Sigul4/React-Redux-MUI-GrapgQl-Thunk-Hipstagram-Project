const actionPending   = name            => ({type: 'PROMISE', status: 'PENDING', name})
const actionFulfilled = (name, payload) => ({type: 'PROMISE', status: 'FULFILLED', name, payload})
const actionRejected  = (name, error)   => ({type: 'PROMISE', status: 'REJECTED', name, error})

const actionPromise = (name, promise) =>
async dispatch => {
    dispatch(actionPending(name))
    try{
        let payload = await promise
        // console.log('==========>',payload)
        dispatch(actionFulfilled(name, payload))
        return payload
    }
    catch(err){
        dispatch(actionRejected(name, err))
    }
}

export {actionPromise, actionFulfilled}
