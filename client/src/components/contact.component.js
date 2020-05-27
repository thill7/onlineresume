import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import MainNav from './mainnav.component';

export default class Contact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <MainNav page="3"/>
                <div className="container">
                    <div className="row text-white bg-color-primary-variant text-on-primary-variant m-4 rounded link-plain">
                        <div className="col-md-12 text-center">
                            <p className="r-header-2">Tanner Hill</p>
                            <hr />
                        </div>
                        <div className="col-md-6 p-4 d-inline-flex flex-column align-items-center justify-content-around">
                            <p className="r-header-4"><FontAwesomeIcon icon={faPhone} /> Phone:</p>
                            <p className="r-subheading"><FontAwesomeIcon icon={faCaretRight} /> <a href="tel:+16616076959">(661) 607-6959</a></p>
                        </div>
                        <div className="col-md-6 p-4 d-inline-flex flex-column align-items-center justify-content-around">
                        <p className="r-header-4"><FontAwesomeIcon icon={faEnvelope}/> Email:</p>
                            <p className="r-subheading"><FontAwesomeIcon icon={faCaretRight} /> <a href="mailto:tanner.hill.96@gmail.com">Personal</a></p>
                            <p className="r-subheading"><FontAwesomeIcon icon={faCaretRight} /> <a href="mailto:thill17@wou.edu">School</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}