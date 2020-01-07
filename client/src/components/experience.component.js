import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from './mainnav.component';
import Languages from './languages.component';
import Work from './work.component';

export default class Experience extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <MainNav page="1" />
                <div className="container">
                    <Languages />
                    <hr />
                    <Work />
                </div>
            </div>
        )
    }
}