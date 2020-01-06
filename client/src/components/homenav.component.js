import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class HomeNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="home-nav flex-column flex-md-row">
                <Link className="r-subheading flex-fill" to="/experience">Experience</Link>
                <Link className="r-subheading flex-fill" to="/education">Education</Link>
                <Link className="r-subheading flex-fill" to="/contact">Contact</Link>
            </div>
        );
    }
}