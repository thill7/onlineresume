import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWindowClose, faBorderNone } from '@fortawesome/free-solid-svg-icons';

export default class Languages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            languages: [],
            shownLanguage: 0,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get("/repos/get/languages")
            .then(response => this.setState({languages:response.data,isLoaded:true}))
            .catch(err => console.log(err));
    }

    onLanguageSelect = (id) => {
        if(this.state.shownLanguage == id) {
            this.setState({shownLanguage:0});
        }
        else {
            this.setState({shownLanguage:id});
        }
    }

    render() {
        var {languages,isLoaded,shownLanguage} = this.state;

        if(!isLoaded) {
            return(
                <div>
                    <p className="r-subheading p-3 alert alert-info text-center">Loading...</p>
                </div>
            )
        }

        return(
            <div>
                <p className="r-header-2">Programming</p>
                <div className="list-inline">
                    {
                        languages.map(l => {
                            return(
                                <button className={"btn m-1 r-subheading"+(shownLanguage == l._id ? " btn-secondary" : " btn-info")} key={l._id} onClick={() => {this.onLanguageSelect(l._id)}}>{l.language}</button>
                            )
                        })
                    }
                </div>
                <div className="row">
                    {
                        languages.map(language => {
                            let displayStyle = shownLanguage == 0 ? {} : (shownLanguage != language._id ? {display:"none"} : {});
                            return(
                                <div className="col-md-6 my-3" key={language._id} style={displayStyle}>
                                    <div className="card bg-darker text-white">
                                        <div className="card-header bg-success"><p className="r-header-3"><span className="font-weight-bold">{language.language}</span></p></div>
                                        <div className="card-body">
                                            <dl className="row">
                                                <dt className="col-md">Bytes written (from Github)</dt>
                                                <dd className="col-md">{language.bytes}</dd>
                                            </dl>
                                            <dl className="row">
                                                <dt className="col-md">Self-taught</dt>
                                                <dd className="col-md"><FontAwesomeIcon icon={language.selfTaught ? faCheckCircle : faWindowClose}/></dd>
                                            </dl>
                                            <dl className="row">
                                                <dt className="col-md">School-taught</dt>
                                                <dd className="col-md"><FontAwesomeIcon icon={language.schoolTaught ? faCheckCircle : faWindowClose}/></dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}