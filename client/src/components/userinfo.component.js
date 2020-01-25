import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faCheckCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject:undefined,
            lastPush:undefined,
            login:props.login,
        };
    }

    async componentDidMount() {
        try {
            var newUserData = await axios.get("/users/get/"+this.state.login);
            var repoData = await axios.get("/repos/get");
            var mostRecentPush = repoData.data[0].pushed_at;
            this.setState({userObject:newUserData.data,lastPush:mostRecentPush});
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {

        var {userObject,lastPush} = this.state;

        if(userObject != undefined && lastPush != undefined) {
            return(
                <div className="row p-3 bg-darker m-4 text-white rounded">
                    <div className="col-xs-4 d-flex flex-column align-items-center justify-content-center">
                        <img src={userObject.avatar_url} alt={userObject.login} className="mr-3 rounded-circle img-github" />
                    </div>
                    <div className="col-xs-8 d-flex flex-column align-items-center align-items-lg-start justify-content-center">
                        <h4 className="r-subheading"><span className="font-weight-bold">Github</span>: <a className="link-github" href={userObject.html_url}>{userObject.login}</a></h4>
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