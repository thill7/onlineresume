import React, {Component} from 'react';
import axios from 'axios';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            login:props.login,
            url:'',
            avatar_url:''
        };
    }

    componentDidMount() {
        axios.get("users/get/"+this.state.login).then(userData => {
            this.setState({name:userData.data.name,url:userData.data.url,avatar_url:userData.data.avatar_url});
            console.log(this.state);
        })
        .catch(err => console.log(err));
    }

    render() {

        var {name, login, url, avatar_url} = this.state;

        const imgStyle = {
            maxWidth: "15vh"            
        };

        if(url !== '') {
            return(
                
                <div className="media p-3 bg-dark text-white rounded">
                    <img src={avatar_url} alt={login} style={imgStyle} className="mr-3 mt-3 rounded-circle" />
                    <div className="media-body">
                    <h4>{name}</h4>
                    <p></p>
                    <p>{login}</p>
                    <p>{url}</p>
                    </div>
                </div>
                
            );
        }
        return(
            <div className="alert alert-info lead">
                Loading...
            </div>
        );
    }
}