import React from 'react';
import { Form, TextInput, Box, Button } from 'grommet';
import '../styles/newpost.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addBlog } from '../actionCreator';

class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            body:'',
            image:''
        }
    }
    submitBlog = (e) =>{
        e.preventDefault();
        this.props.addBlog(this.state);
        this.props.incStat();
        this.props.history.push('/blogs');
    }
    render(){
        return(
            <div className="NewPost">
                <Form onSubmit={(e) => this.submitBlog(e)}>
                    <Box direction="column" gap="medium" className="formfield">
                        <span className="Heading">Add a new post</span>
                        <TextInput required type="text" placeholder="Title" name="title" onChange={({target}) => this.setState({[target.name]:target.value})}/>
                        <TextInput required type="text" placeholder="Image Link" name="image" onChange={({target}) => this.setState({[target.name]:target.value})}/>
                        <TextInput required type="text" placeholder="Body" name="body" onChange={({target}) => this.setState({[target.name]:target.value})}/>
                    </Box>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Post" />
                        <Button type="reset" label="Reset" onClick={() => this.setState({title:'',body:'',image:''})}/>
                    </Box>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = disptach =>{
    return{
        addBlog:(blog) => disptach(addBlog(blog))
    }
}

export default withRouter(connect(null,mapDispatchToProps)(NewPost))