import React, {Component} from 'react';

import HomeNav from './homenav.component';
import MainNav from './mainnav.component';
import UserInfo from './userinfo.component';
import '../styles/home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="home-container bg-light text-on-primary">
                <div className="d-inline-flex flex-column align-items-center justify-content-center">
                    <h2 className="r-header-1">&lt;Tanner Hill /&gt;</h2>
                    <p className="r-header-4">Computer Science B.Sc.</p>
                </div>
                <HomeNav />
                <UserInfo login="thill7"/>
            </div>
        );
    }
}