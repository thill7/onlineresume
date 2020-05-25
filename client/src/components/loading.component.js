import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class Loading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container">
                <p className="r-subheading p-3 alert bg-color-primary text-on-primary text-center"><FontAwesomeIcon icon={faSpinner} className="spinner"/> Loading...</p>
            </div>
        )
    }
}