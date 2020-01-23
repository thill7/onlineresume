import React, {Component} from 'react';

import HomeNav from './homenav.component';
import MainNav from './mainnav.component';
import UserInfo from './userinfo.component';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="home-container bg-dark text-white">
                <h2 className="r-header-1">&lt;Tanner Hill /&gt;</h2>
                <p className="r-header-4">Computer Science B.Sc.</p>
                <HomeNav />
                <UserInfo />
            </div>
        );
    }
}