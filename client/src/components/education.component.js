import React, {Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from './mainnav.component';
import Axios from 'axios';

export default class Education extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classData: [],
            isLoaded: false,
            filter: 0
        };
    }

    componentDidMount() {
        Axios.get('/classes')
            .then(data => this.setState({classData:data.data,isLoaded:true}))
            .catch(err => console.log(err));
    }

    onFilterChange(newFilter) {
        if(this.state.filter == newFilter) {
            this.setState({filter:0});
        }
        else {
            this.setState({filter:newFilter});
        }
    }

    render() {
        var {classData,isLoaded,filter} = this.state;

        if(classData.length < 1) {
            return(
                <div>
                    <MainNav page="2" />
                    <div className="container">
                        <p className="r-subheading p-3 alert alert-info text-center">Loading...</p>
                    </div>
                </div>
            );
        }

        return(
            <div>
                <MainNav page="2" />
                <div className="container">
                    <div className="wou rounded"><img src="/images/logo.svg" /></div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center">
                            <button onClick={() => {this.onFilterChange(1);}} className={"btn r-subheading my-2" + (filter == 1 ? " active btn-secondary" : " btn-info")}><span className="font-weight-bold">Major: </span>Computer Science</button>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center">
                            <button onClick={() => {this.onFilterChange(2);}} className={"btn r-subheading my-2" + (filter == 2 ? " active btn-secondary" : " btn-info")}><span className="font-weight-bold">Minor: </span>Art and Design</button>
                        </div>
                    </div>
                    <hr />
                    <p className="r-header-3">Coursework</p>
                    <div className="row">
                    {
                        classData.map(data => {
                            var displayStyle = {};
                            if(filter == 1) {
                                if(data.cardType != "CS") {
                                    displayStyle = {
                                        display:"none"
                                    };
                                }
                            }
                            else if(filter == 2) {
                                if(data.cardType != "A") {
                                    displayStyle = {
                                        display:"none"
                                    };
                                }
                            } 
                            return(
                                
                                <div className="col-md-6 my-3" key={data._id} style={displayStyle}>
                                    <div className="card bg-secondary text-white">
                                        <div className={data.cardType == "CS" ? "card-header bg-success" : "card-header bg-info"}>
                                            <p className="r-subheading">{data.className}</p>
                                            <p className="r-text-small">{data.cardType+data.classNumber}</p>
                                            <button data-toggle="collapse" data-target={"#"+data.cardType+data.classNumber} className="btn btn-block btn-primary">Info</button>
                                        </div>
                                        <div className="card-body collapse" id={data.cardType+data.classNumber}>
                                            {ReactHtmlParser(data.info)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    </div>
                    <hr />
                    <p className="r-header-3">Commendations</p>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="r-subheading bg-info p-3 rounded"><span className="font-weight-bold">GPA: </span>3.89</p>
                        </div>
                        <div className="col-md-6">
                            <p className="r-subheading bg-info p-3 rounded">Academic Honor Roll (since 2017)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}