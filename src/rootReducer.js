import {combineReducers} from 'redux'
// import flashMessages from './reducers/flashMessages'
import loginReducers from './reducers/loginReducers'
import schoolReducers from "./reducers/schoolReducers"
// import postsReducers from "./reducers/postsReducers"
// import commentsReducers from "./reducers/commentsReducers"

export default combineReducers({
    // flashMessages,
    loginReducers,
    schoolReducers
})
