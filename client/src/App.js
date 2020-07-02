import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Icon, Card, Placeholder, Statistic } from 'semantic-ui-react';
import { Button } from 'grommet';
import Header from './components/header';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NewPost from './components/newpost';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      image:'',
      body:'',
      sidenav:false,
      statBlogs:0,
      interval:'',
      errors:{
        login:''
      }
    }
  }
  setSidenav = () =>{
    this.setState(state =>({
      sidenav:!state.sidenav
    }))
  }
  setLoginError = () =>{
    this.setState(state =>({errors:{...state.errors,login:''}}))
  }
  resize = () =>{
    let w = window.innerWidth;
    this.props.setWidth(w);
  }
  setStat = () =>{
    if(this.props.loaded.blogs){
      if(this.state.statBlogs === this.props.blogs.length){
        clearInterval(this.state.interval);
      } else {
        this.incStat();
      }
    }
  }
  incStat = () =>{
    this.setState(state =>({statBlogs:state.statBlogs+1}))
  }
  componentDidMount = () =>{
      this.setState({
        interval:setInterval(this.setStat,1)
      })
    window.addEventListener('resize',this.resize);
    Axios.get('/blogs/getAllBlogs')
    .then(response =>{
      this.props.initBlogs(response.data);
      this.props.loadBlogs();
    })
    .catch(err =>{
      console.log(err);
      this.props.initBlogs([]);
      this.props.loadBlogs();
    })
    Axios.get('/auth/checkLoggedStatus')
    .then(response =>{
      this.props.loadUser();
      this.props.setUser(response.data.user);
    })
    .catch(err =>{
      console.log(err);
    })
  }
  closeSidenav = () => {
    this.setState(state =>({
      sidenav: !state.sidenav
    }))
    let sidenav = document.querySelector(".sidebar");
    let overlay = document.querySelector(".overlay");
    sidenav.style.left = "-200px";
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
  };
  setLoginPrompt = () =>{
    this.setState(state =>({errors:{...state.errors,login:'Please LogIn First'}}));
  }
  render(){
    const blogsList = (!this.props.blogs.length)?(
      [1,2,3].map(elem =>{
        return(
          <Card 
            key={elem}
            image={"https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
            header={<Placeholder.Line />}
            meta={<Placeholder.Line />}
            description={<Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>}
          />
        )
      })
    ):(
      this.props.blogs.map((blog,index) =>{
        if(index === 0){
          return (
            <Card
              style={{marginTop:'12px'}}
              key={blog._id}
              image={blog.image}
              header={blog.title}
              meta={`by ${blog.author}`}
              description={`${blog.body.substr(0,150)}...`}
              extra={<a href="/">
                <Icon name='user' />
                16 Friends
              </a>}
            />        
          )
        } else {
          return (
            <Card
              key={blog._id}
              image={blog.image}
              header={blog.title}
              meta={`by ${blog.author}`}
              description={`${blog.body.substr(0,150)}...`}
              extra={<a href="/">
                <Icon name='user' />
                16 Friends
              </a>}
            />        
          )
        }
      })
    )
    return (
      (this.props.loaded.user)?(
        <div className="App">
        <Router>
            <Header setSidenav={this.setSidenav} sidenav={this.state.sidenav}/>
            <div className="sidebar">
            <img
              alt="not FOund"
              src="https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=60&q=80"
            />
              <li>
                <Icon name="home" size="big" />
                &nbsp;&nbsp;Home
              </li>
              <li onClick={() => window.location.assign('/blogs/new')}>
                <Icon name="braille" size="big" />
                &nbsp;&nbsp;New Post
              </li>
            <Button label="close" primary onClick={this.closeSidenav} />
          </div>
          <div className="overlay" onClick={this.closeSidenav} />
          <Switch>
            <Route path="/" exact>
              <Redirect to='/blogs' />
            </Route>
            <Route path="/blogs" exact>
              <div className="Blogs">
              <Statistic style={{marginLeft:(this.props.w <= 700)?('44%'):('47%')}}>
                <Statistic.Value>{this.state.statBlogs}</Statistic.Value>
                <Statistic.Label>{this.props.blogs.length === 1 ? ('blog'):('blogs')}</Statistic.Label>
              </Statistic><br />
              <div className="blogs">
                {blogsList}
              </div>
              </div>
            </Route>
            <Route path="/blogs/new" exact>
              {this.props.user?(
                <NewPost incStat={this.incStat}/>
              ):(() =>{
                  Axios.post('/createCookie',{name:'RedirectCookie',payload:'/blogs/new',expireTime:180000})
                  this.setLoginPrompt();
                  return <Redirect to='/auth/login' />
              }
              )}
            </Route>
            <Route path="/auth/login" exact>
              {this.props.user?(
                <Redirect to='/' />
              ):(
                <Login error={this.state.errors.login} setLoginError={this.setLoginError}/>
              )}
            </Route>
            <Route path="/auth/register" exact>
            {this.props.user?(
                <Redirect to='/' />
              ):(
              <Register />
              )}
            </Route>
            <Route path='/profile'>
            {this.props.user?(
                <Profile />
              ):(() =>{
                this.setLoginPrompt();
                return <Redirect to='/auth/login' />
              }
              )}
            </Route>
          </Switch>
          <Footer />
        </Router>
        </div>  
      ):(null)
    );
  }
}

const mapStateToProps = state =>{
  return{
    blogs:state.blogs,
    w:state.width,
    loaded:state.loaded,
    user:state.user
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    initBlogs:(blogs) => dispatch({type:'INIT_BLOGS',blogs}),
    setWidth:(width) => dispatch({type:'SET_WIDTH',width}),
    loadBlogs:() => dispatch({type:'LOAD_BLOGS'}),
    loadUser:() => dispatch({type:'LOAD_USER'}),
    setUser:(user) => dispatch({type:'SET_USER',user})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);