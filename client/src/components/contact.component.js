import React, {Component} from 'react';
import UserInfo from './userinfo.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default class Contact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row bg-dark text-white">
                <div className="col-md-6">
                    <div className="p-4 bg-primary m-4 rounded link-plain">
                        <p className="r-header-2">Tanner Hill</p>
                        <p className="r-header-4"><FontAwesomeIcon icon={faPhone} /> <a href="tel:+16616076959">(661) 607-6959</a></p>
                        <p className="r-header-4"><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:tanner.hill.96@gmail.com">Email</a></p>
                    </div>
                </div>
                <div className="col-md-6">
                    <UserInfo login="thill7" />
                </div>
            </div>
        );
    }
}