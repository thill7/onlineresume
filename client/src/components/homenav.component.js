import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class HomeNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="home-nav">
                <Link className="r-text-small" to="/experience">Experience</Link>
                <Link className="r-text-small" to="/education">Education</Link>
                <Link className="r-text-small" to="/contact">Contact</Link>
            </div>
        );
    }
}