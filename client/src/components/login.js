import React from "react";
import "../styles/auth.scss";
import { connect } from "react-redux";
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, TextInput, Box, Button } from 'grommet';
import { Message } from "semantic-ui-react";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            background:'lightgrey',
            errors:{
              unAuth:'',
              notLoggedIn:props.error
            }
        }
    }
    login = (e) =>{
        e.preventDefault();
        let { username, password } = this.state;
        Axios.post('/auth/login',{username,password})
        .then(response =>{
          let user = response.data.user;
          Axios.post('/getAndClearCookie',{name:'RedirectCookie'})
          .then(response =>{
            let cookie = response.data.cookie;
            console.log(cookie);
            if(cookie){
              this.props.setUser(user);
              this.props.history.push(cookie);
            } else {
              this.props.setUser(user);
              this.props.history.push('/profile');
            }
          })
          .catch(err =>{
            console.log(err);
            this.props.setUser(user);
            this.props.history.push('/profile');
            })
          })
        .catch(err =>{
          if(err.response){
            if(err.response.status === 401){
              this.setState(state =>({errors:{...state.errors,unAuth:'Invalid Username or Password'}}))
            }
          }
        })
    }
    componentDidMount = () =>{
      this.props.setLoginError();
    }
    render(){        
        return (
          <div className="Login">
            <img
              src="https://source.unsplash.com/1600x900/?wallpapers"
              className="background_image"
              alt="not found"
              onLoad={() => this.setState({background:'white'})}
            />
            {(this.state.errors.unAuth)?(
            <Message negative style={{width:'30%',position:'absolute',left:'34%',top:'140px'}}>
              <Message.Header>{this.state.errors.unAuth}</Message.Header>
            </Message>
            ):(null)}
            {(this.state.errors.notLoggedIn)?(
            <Message negative style={{width:'30%',position:'absolute',left:'34%',top:'140px'}}>
              <Message.Header>{this.state.errors.notLoggedIn}</Message.Header>
            </Message>
            ):(null)}
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
                <h2>Classic LogIn</h2>
                <Form onSubmit={(e) => this.login(e)}>
                    <TextInput placeholder="Username" type="text" name="username" onChange={({target}) => this.setState({[target.name]:target.value})} />
                    <span className="inputInfo">Username must be 6 or more characters</span>
                    <TextInput placeholder="Password" type="password" name="password" onChange={({target}) => this.setState({[target.name]:target.value})} />
                    <span className="inputInfo">Username must be 6 or more characters</span>
                    <Box direction="row" gap="small" className="Box">
                        <Button type="submit" primary label="Login" />
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

export default withRouter(connect(null,mapDispatchToProps)(Login));