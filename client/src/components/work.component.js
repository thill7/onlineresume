import React, {Component} from 'react';
import axios from 'axios';
import Loading from './loading.component';

export default class Work extends Component {
    constructor(props) {
        super(props);

        this.state = {
            work: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('/work/get')
            .then(response => this.setState({work:response.data,isLoaded:true}))
            .catch(err => console.log(err));
    }

    render() {
        var {work,isLoaded} = this.state;

        if(!isLoaded) {
            return(
                <Loading />
            )
        }

        return(
            <div>
                <p className="r-header-2">Work History</p>
                {
                    work.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)).map(w => {
                        var commendations = <span></span>;
                        if(w.commendations.length > 0) {
                            commendations = (
                                <div>
                                    <hr />
                                    <p className="r-subheading font-weight-bold">Commendations:</p>
                                    <ul className="list-group">
                                        {
                                            w.commendations.map(c => {
                                                return(
                                                <li key={c._id} className="list-group-item bg-color-primary-variant text-on-primary-variant">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <p className="font-weight-bold">{c.title} <span className={c.recurrance != null ? "badge bg-secondary text-on-primary-variant" : ""}>{c.recurrance}</span></p>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <p>{c.description}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        }
                        let startDate = w.startDate != null ? new Date(w.startDate) : new Date();
                        let endDate = w.endDate != null ? new Date(w.endDate) : undefined;
                        return(
                            <div className="card bg-color-primary-light text-on-primary my-4 shadow" key={w._id}>
                                <div className="card-header bg-color-primary-variant text-on-primary-variant">
                                    <p className="r-header-4">{w.employer}</p>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 my-2 d-flex flex-column justify-content-centered align-items-center">
                                            <img className="img-work bg-secondary rounded p-4" src={w.imageUrl} />
                                        </div>
                                        <div className="col-md-8 my-2">
                                            <p className="r-text-small"><span className="font-weight-bold">Description: </span>{w.jobDescription}</p>
                                        </div>
                                    </div>
                                    {commendations}
                                </div>
                                <div className="card-footer">
                                    <p className="r-subheading"><span className="font-weight-bold">Employed: </span> {`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`+" - "+ (endDate ? `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}` : "Currently Employed")}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}