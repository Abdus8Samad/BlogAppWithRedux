import React from "react";
import "../styles/auth.scss";
import { connect } from "react-redux";
import { Form, TextInput, Box, Button } from 'grommet';
import Axios from "axios";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            avatar:'',
            password:'',
            background:'lightgrey'
        }
    }
    register = (e) =>{
        e.preventDefault();
        Axios.post('/auth/register',{
          username:this.state.username,
          avatar:this.state.avatar,
          password:this.state.password
        })
        .then(response =>{
          if(response.data.status === 200){
            this.props.setUser(response.data.user);
            this.props.history.push('/profile');
          } else {
            console.log(response.data.err.message);
          }
        })
        .catch(err =>{
          console.log(err);
        })
    }
    render(){        
        return (
          <div className="Register">
            <img
              src="https://source.unsplash.com/1600x900/?wallpapers"
              className="background_image"
              alt="not found"
              onLoad={() => this.setState({background:'white'})}
            />
            <div className="container" style={{background:this.state.background}}>
              <div className="thirdParty">
                <div className="content">
                  <p>Login</p>
                  <div className="icons">
                    <a href="/">
                      <i className="facebook icon" />
                    </a>
                    <a href="/">
                      <i className="twitter icon" />
                    </a>
                    <a href="/">
                      <i className="google plus icon" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="form">
                <h2>Classic Sign Up</h2>
                <Form onSubmit={(e) => this.register(e)}>
                    <TextInput placeholder="Username" type="text" name="username" onChange={({target}) => this.setState({[target.name]:target.value})} />
                    <span className="inputInfo">Username must be 6 or more characters</span>
                    <TextInput placeholder="Avatar Link" type="url" name="avatar" onChange={({target}) => this.setState({[target.name]:target.value})} />
                    <span className="inputInfo">Username must be 6 or more characters</span>
                    <TextInput placeholder="Password" type="password" name="password" onChange={({target}) => this.setState({[target.name]:target.value})} />
                    <span className="inputInfo">Username must be 6 or more characters</span>
                    <Box direction="row" gap="medium" className="Box">
                        <Button type="submit" primary label="Register" />
                        <Button type="reset" label="Reset" onClick={() => this.setState({username:'',avatar:'',password:''})}/>
                    </Box>
                </Form>
              </div>
            </div>
          </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
  return{
    setUser:(user) => dispatch({type:'SET_USER',user})
  }
}

export default connect(null,mapDispatchToProps)(Register);