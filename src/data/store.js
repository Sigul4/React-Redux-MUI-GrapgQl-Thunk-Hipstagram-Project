import { createStore, applyMiddleware } from "redux";
import combinedReducers                 from "../reducers/combineReducers";     
import thunk                            from "redux-thunk";
import actionAuthLogin                  from "../actions/actionAuthLogin";
import actionAboutMe                    from "../actions/actionAboutMe";

const store = createStore(combinedReducers, applyMiddleware(thunk))
if (localStorage.authToken){
    store.dispatch(actionAuthLogin(localStorage.authToken))
    store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id))
}

store.subscribe(() => console.log(store.getState()));

export default store;
