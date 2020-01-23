import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject:undefined,
            login:props.login,
        };
    }

    componentDidMount() {
        axios.get("users/get/"+this.state.login).then(userData => {
            this.setState({userObject:userData.data});
            console.log(this.state);
        })
        .catch(err => console.log(err));
    }

    render() {

        var {userObject} = this.state;

        if(userObject != undefined) {
            return(
                <div className="media p-3 bg-primary m-4 text-white rounded">
                    <img src={userObject.avatar_url} alt={userObject.login} className="mr-3 rounded-circle img-github" />
                    <div className="media-body">
                    <h4 className="r-subheading"><span className="font-weight-bold">Github</span>: <a href={userObject.html_url}>{userObject.login}</a></h4>
                    <p className="r-text-small"><span className="font-weight-bold">Public Repos</span>: {userObject.public_repos}</p>
                    <p className="r-text-small"><span className="font-weight-bold">Hireable</span>: <FontAwesomeIcon icon={userObject.hireable ? faCheckCircle : faWindowClose} /></p>
                    </div>
                </div>
                
            );
        }
        return(
            <div className="lead p-3 bg-info m-4 text-white rounded">
                <FontAwesomeIcon icon={faSync} className="spinner" />
            </div>
        );
    }
}