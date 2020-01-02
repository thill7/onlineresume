import React, {Component} from 'react';

export default class Contact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row bg-dark text-white">
                <div className="col-md-6">
                    <div className="p-4 bg-primary m-4 rounded">
                        <p className="r-header-2">Tanner Hill</p>
                        <p className="r-header-4">(661) 607-6959</p>
                        <a href="mailto:tanner.hill.96@gmail.com" className="r-header-4">Email</a>
                    </div>
                </div>
                <div className="col-md-6 p-4 bg-primary my-4">
                    
                </div>
            </div>
        );
    }
}