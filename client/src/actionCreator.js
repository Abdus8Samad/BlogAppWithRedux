import Axios from "axios"

function addBlog(blog){
    return (dispatch, getState) =>{
        Axios.post('/blogs/new',{blog})
        .then(response =>{
            dispatch({type:'ADD_BLOG',blog:response.data.blog})
        })
        .catch(err =>{
            console.log(err);
        })
    }
}

export {
    addBlog
}