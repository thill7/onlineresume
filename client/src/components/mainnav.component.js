import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class MainNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: props.page
        };
    }

    render() {
        var {page} = this.state;
        console.log(page);

        return(
            <div className="main-nav-container">
                <div className="main-nav-collapse">
                    <button data-toggle="collapse" data-target="#mainNav" className="btn btn-info"><FontAwesomeIcon icon={faBars} /></button>
                    <span className="flex-fill">&lt;Tanner Hill /&gt;</span>
                </div>
                <div className="main-nav flex-column flex-md-row collapse" id="mainNav">
                    <Link to="/" className={page == 0 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Home</Link>
                    <Link to="/experience" className={page == 1 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Experience</Link>
                    <Link to="/education" className={page == 2 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Education</Link>
                    <Link to="/projects" className={page == 3 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Projects</Link>
                    <Link to="/contact" className={page == 4 ? "flex-fill main-nav-active" : "flex-fill main-nav-link"}>Contact</Link>
                </div>
            </div>
        )
    }
}