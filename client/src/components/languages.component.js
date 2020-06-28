import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading.component';

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
                <Loading />
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
                                <div className="col-md-6 my-3" style="min-height:100%;" key={language._id} style={displayStyle}>
                                    <div className="card bg-color-primary-light text-on-primary h-100 shadow">
                                        <div className="card-header bg-color-primary-variant text-on-primary-variant"><p className="r-header-3"><span className="font-weight-bold">{language.language}</span></p></div>
                                        <div className="card-body">
                                            <dl className="row">
                                                <dt className="col-md-6">Bytes written (from Github)</dt>
                                                <dd className="col-md-6">{language.bytes}</dd>
                                                <hr />
                                                <dt className="col-md-6">Self-taught</dt>
                                                <dd className="col-md-6"><FontAwesomeIcon icon={language.selfTaught ? faCheckCircle : faTimesCircle}/></dd>
                                                <hr />
                                                <dt className="col-md-6">School-taught</dt>
                                                <dd className="col-md-6"><FontAwesomeIcon icon={language.schoolTaught ? faCheckCircle : faTimesCircle}/></dd>
                                                <hr />
                                                <dt className="col-md-12">Info</dt>
                                                <dd className="col-md-12">{language.info}</dd>
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