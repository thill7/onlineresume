import React, {Component} from 'react';
//import CommitList from './commitlist.component';
//import CollaboratorList from './collaboratorlist.component';
import axios from 'axios';

export default class RepoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            selectedRepoID: 0,
            isLoaded: false,
        };
    }

    onRepoListRefresh = this.onRepoListRefresh.bind(this);
    onChangeRepo = this.onChangeRepo.bind(this);

    componentDidMount() {
        axios.get("/repos/get").then(reposData => {
            this.setState({isLoaded:true,repos:reposData.data});
            console.log(this.state.repos);
        })
        .catch(err => console.log(err));
        
    }

    onChangeRepo(id) {
        this.setState({selectedRepoID:id});
    }

    onRepoListRefresh() {
        axios.get("/repos/get").then(reposData => {
            this.setState({isLoaded:true,repos:reposData.data});
            console.log(this.state.repos);
        })
        .catch(err => console.log(err));
    }

    render() {

        var {isLoaded, repos, selectedRepoID} = this.state;

        var imgStyle = {
            maxWidth: "20%"
        };

        if(!isLoaded || repos.length < 1) {
            return(<div className="alert alert-info lead">Loading...</div>);
        }

        let selectedRepo = selectedRepoID === 0 ? repos[0] : repos.find(repo => repo.id === selectedRepoID);
        let updatedDate = new Date(selectedRepo.updated_at);
        let descriptionClass = selectedRepo.description != null ? "lead alert alert-info" : "lead";

        console.log(selectedRepo);

        return(
            <div className="row repo-container mt-3">
                <div className="col-md-6">
                    <div className="card bg-dark text-white repo-scroll">
                        <div className="card-header bg-primary">
                            <h2>{selectedRepo.name}</h2>
                            <p className="text-small font-italic">Owned by {selectedRepo.owner.login}</p>
                        </div>
                        <div className="card-body">
                            <p className={descriptionClass}>{selectedRepo.description}</p>
                            <p className="font-italic">Last Updated: {`${updatedDate.getMonth()+1}/${updatedDate.getDate()}/${updatedDate.getFullYear()} at ${(updatedDate.getHours()+1)%12}:${updatedDate.getMinutes()+1} ${updatedDate.getHours() + 1 >= 12 ? "PM" : "AM"}`}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <ul className="list-group repo-scroll">
                    {
                        repos.map(repo => 
                        {
                        return(
                        <li key={repo.id} className="list-group-item bg-secondary">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="media border-info rounded border p-3 bg-dark text-white">
                                        <img src={repo.owner.avatar_url} className="rounded mr-auto mt-3 img-github" />
                                        <div className="media-body p-3">
                                            <h3>{repo.name}</h3>
                                        <button className="btn btn-info btn-block" onClick={() => {this.onChangeRepo(repo.id);}} >More Info</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        )
                        })
                    }
                    </ul>
                </div>
                
                <button className="btn btn-info" onClick={() => {this.onRepoListRefresh();}}>Refresh</button>
            </div>
            
        );
    }
}