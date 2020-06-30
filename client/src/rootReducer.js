const { combineReducers } = require("redux")

function blogs(state = [], action){
    switch(action.type){
        case 'INIT_BLOGS':
            return action.blogs
        case 'ADD_BLOG':
            return state.concat([action.blog])
        default:
            return state
    }
}
function width(state = window.innerWidth,action){
    if(action.type === 'SET_WIDTH'){
        return action.width;
    } else {
        return state;
    }
}

function loaded(state = {
    user:false,
    blogs:false
}, action){
    switch(action.type){
        case 'LOAD_BLOGS':
            return {
                ...state,
                blogs:true
            }
        case 'LOAD_USER':
            return {
                ...state,
                user:true
            }
        default:
             return state
    }
}

function user(state = null,action){
    if(action.type === 'SET_USER'){
        return action.user
    } else {
        return state
    }
}

export default combineReducers({
    blogs,
    width,
    user,
    loaded
})