import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component{
    render(){
        return(
            <div className="Profile">
                <h1>{this.props.user.username}</h1>
                <img src={this.props.user.avatar} alt="Not Found"/>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Profile);