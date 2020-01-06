import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from './mainnav.component';

export default class Experience extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <MainNav page="1" />
                <div className="container">
                    <h2>Experience</h2>
                </div>
            </div>
        )
    }
}