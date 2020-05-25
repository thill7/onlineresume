import React, {Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import MainNav from './mainnav.component';
import Loading from './loading.component';
import Axios from 'axios';
import '../styles/education.scss';

export default class Education extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classData: [],
            isLoaded: false,
            filter: 0,
            allTags: [],
            tagsSelected: []
        };
    }

    componentDidMount() {
        Axios.get('/classes')
            .then(data => {
                var newTags = [];
                data.data.forEach((tags) => {
                    tags.tags.forEach((tag) => {
                        if(!newTags.includes(tag)) {
                            newTags.push(tag);
                        }
                    })
                });
                let newClassData = data.data.sort((a,b) => a.cardType > b.cardType ? 1 : (b.cardType > a.cardType ? -1 : 0));
                newTags.sort();
                this.setState({classData:newClassData,tagsSelected:[],allTags:newTags,isLoaded:true});
            })
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

    onTagSelect(tag) {
        if(this.state.tagsSelected.includes(tag)) {
            this.setState({tagsSelected:this.state.tagsSelected.filter(t => t != tag)});
        }
        else {
            let newSelected = this.state.tagsSelected;
            newSelected.push(tag);
            this.setState({tagsSelected:newSelected});
        }
    }

    onClearTags() {
        this.setState({tagsSelected:[]});
    }

    render() {
        var {classData,isLoaded,allTags,tagsSelected,filter} = this.state;

        if(classData.length < 1) {
            return(
                <div>
                    <MainNav page="2" />
                    <Loading />
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
                        <div className="col-md-6">
                            <p className="r-subheading bg-color-primary-variant text-on-primary-variant p-3 rounded"><span className="font-weight-bold">GPA: </span>3.89</p>
                        </div>
                        <div className="col-md-6">
                            <p className="r-subheading bg-color-primary-variant text-on-primary-variant p-3 rounded">Academic Honor Roll</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md">
                            <p className="r-header-3">Coursework</p>
                        </div>
                        <div className="col-md">
                            <button onClick={() => {this.onFilterChange(1);}} className={"btn r-subheading my-2" + (filter == 1 ? " active btn-secondary" : " btn-info")}><span className="font-weight-bold">Major: </span>Computer Science</button>
                        </div>
                        <div className="col-md">
                            <button onClick={() => {this.onFilterChange(2);}} className={"btn r-subheading my-2" + (filter == 2 ? " active btn-secondary" : " btn-info")}><span className="font-weight-bold">Minor: </span>Art and Design</button>
                        </div>
                    </div>
                    
                    <div className="list-inline">
                        <span className="m-1 font-weight-bold r-text-small">Filter By Tag: </span>
                        <button className="btn btn-danger m-1 r-text-small" onClick={() => {this.onClearTags()}} ><FontAwesomeIcon icon={faTimesCircle} /></button>
                    {
                        allTags.map(t => {
                            return(
                                <button className={"btn m-1 r-text-small"+(tagsSelected.includes(t) ? " btn-secondary" : " btn-info")} key={t} onClick={() => {this.onTagSelect(t)}}>{t}</button>
                            )
                        })
                    }
                    </div>
                    <div className="row">
                    {
                        classData.sort((a,b) => b.cardType > a.cardType ? 1 : -1).map(data => {
                            var displayStyle = {
                                minHeight: "100%"
                            };
                            if(filter == 1) {
                                if(data.cardType != "CS") {
                                    displayStyle.display = "none";
                                }
                            }
                            else if(filter == 2) {
                                if(data.cardType != "A") {
                                    displayStyle.display = "none";
                                }
                            } 
                            if(tagsSelected.length > 0 && data.tags.filter(tag => tagsSelected.includes(tag)).length == 0) {
                                displayStyle.display = "none";
                            }
                            return(
                                
                                <div className="col-md-6 my-3" key={data._id} style={displayStyle}>
                                    <div className="card bg-color-primary text-on-primary h-100 shadow">
                                        <div className="card-header bg-color-primary-variant text-on-primary-variant">
                                            <p className="r-subheading">{data.className}</p>
                                            <p className="r-text-small">{data.cardType+data.classNumber}</p>
                                        </div>
                                        <div className="card-body">
                                            <button data-toggle="collapse" data-target={"#"+data.cardType+data.classNumber} className="btn btn-block btn-info">Info</button>
                                            <div className="collapse" id={data.cardType+data.classNumber}>
                                                <hr />
                                                {ReactHtmlParser(data.info)}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <p className="font-italic">Taken {data.dateTaken}.</p>
                                            <div className="list-inline"><span className="font-weight-bold">Tags: </span>
                                            {
                                                data.tags.map(tag => {
                                                    return(<span className="badge badge-secondary mx-1 p-1">{tag}</span>)
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}