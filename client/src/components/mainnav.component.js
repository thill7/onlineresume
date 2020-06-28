import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class MainNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: props.page
        };
    }

    render() {
        var {page} = this.state;

        return(
            <div className="main-nav flex-column flex-md-row">
                <Link to="/" className={page == 0 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Home</Link>
                <Link to="/experience" className={page == 1 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Experience</Link>
                <Link to="/education" className={page == 2 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Education</Link>
                <Link to="/projects" className={page == 3 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Projects</Link>
                <Link to="/contact" className={page == 4 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Contact</Link>
            </div>
        )
    }
}