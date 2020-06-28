import React, {Component} from 'react';
import Axios from 'axios';
import Loading from "./loading.component";
import MainNav from "./mainnav.component";
import Carousel from './carousel.component';
import '../styles/projects.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            projects: [],
            tagsSelected: [],
            autoCompleteSuggestions: [],
            filterInput: ""
        };

        this.filterInputRef = React.createRef();
    }

    async loadProjects() {
        let projects = (await Axios.get("/projects/get")).data;
        this.setState({projects,isLoading:false});
    }

    async componentDidMount() {
        await this.loadProjects();
    }

    onFilterInput(e) {
        var text = e.target.value.toLowerCase();
        if(text.length == 0 || text.match(/\s+/gm)) {
            this.setState({autoCompleteSuggestions:[]});
            return;
        }
        var allTags = this.state.projects.map(p => p.tags).flat(1);
        var distinctTags = allTags.filter((tag,i) => allTags.indexOf(tag) === i);
        this.setState({autoCompleteSuggestions:distinctTags.filter(tag => tag.toLowerCase().includes(text))});
    }

    onFilterInputChanged(e) {
        this.setState({filterInput:e.target.value});
    }

    onFilterTagSelected(tag) {
        var {tagsSelected} = this.state;
        if(!tagsSelected.includes(tag)) {
            this.setState({tagsSelected:[...tagsSelected,tag],autoCompleteSuggestions:[],filterInput:""});
        }
    }

    onRemoveSelectedTag(tag) {
        var {tagsSelected} = this.state;
        this.setState({tagsSelected:tagsSelected.filter(t => t != tag)});
    }

    render() {
        var {isLoading,projects,autoCompleteSuggestions,tagsSelected,filterInput} = this.state;

        var filteredProjects = projects.filter(p => tagsSelected.length == 0 || p.tags.some(t => tagsSelected.includes(t)));

        if(isLoading) {
            return(
                <div>
                    <MainNav page="3" />
                    <Loading /> 
                </div>
            );
            
        }
        else {
            return(
                <div>
                    <MainNav page="3" />
                    <div className="container">
                    <div className="row mb-4">
                        <div className="col-md p-4">
                            <p className="r-header-4 font-weight-light">Filter By Tag:</p>
                            <div className="input-group">
                                <input className="form-control" value={filterInput} onChange={(e) => {this.onFilterInputChanged(e);}} type="text" ref={el => this.filterInputRef = el} ref onInput={(e) => {this.onFilterInput(e);}} onFocus={(e) => {this.onFilterInput(e);}}/>
                                {
                                    autoCompleteSuggestions.length > 0
                                    ?
                                    <ul className="autocomplete-list">
                                        {
                                            autoCompleteSuggestions.map(ac => {
                                                return(
                                                    <li onClick={() => {this.onFilterTagSelected(ac);}}>{ac}</li>
                                                );
                                            })
                                        }
                                    </ul>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="col-md p-4">
                            {
                                tagsSelected.length > 0
                                ?
                                <div>
                                    <p className="r-header-4 font-weight-light">Selected:</p>
                                    {
                                        tagsSelected.map(tag => {
                                            return(
                                                <div className="btn-group mr-2">
                                                    <span className="btn btn-info">{tag}</span>
                                                    <button className="btn btn-danger" onClick={() => {this.onRemoveSelectedTag(tag);}}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></button>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    {
                        filteredProjects.map(project => {
                            return(
                                <div className="card bg-color-primary-light text-on-primary shadow mb-4" key={project._id}>
                                    <div className="card-header bg-color-primary-variant text-on-primary-variant">
                                        <p className="r-header-4 font-weight-light">{project.title}</p>
                                        <p className="r-text-small">{project.description}</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="h-100 bg-color-primary-variant text-on-primary-variant d-flex flex-column justify-content-between rounded p-4">
                                                    <div>
                                                        <p className="r-header-4 font-weight-light">Role</p>
                                                        <p className="r-text-small">{project.role}</p>
                                                        <span className="font-weight-bold mr-2">Tags:</span>
                                                        {
                                                            project.tags.map(tag => {
                                                                return(
                                                                    <span className="badge badge-secondary mr-2">{tag}</span>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        project.links.length > 0 
                                                        ?
                                                        <div>
                                                            <hr />
                                                            <p className="r-header-4 font-weight-light">Links</p>
                                                            <ul className="link-plain">
                                                                {
                                                                    project.links.map(link => {
                                                                        return(
                                                                            <li><a href={link} className="r-text-small">{link}</a></li>
                                                                        );
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            {
                                                project.media.length > 0
                                                ?
                                                <div className="col-md mt-4 mt-md-0">
                                                    <Carousel media={project.media} />
                                                </div>
                                                :
                                                <span></span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }   
                    </div>
                </div>
            );
        }
    }
}