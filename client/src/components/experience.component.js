import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from './mainnav.component';
import Languages from './languages.component';
import Work from './work.component';

export default class Experience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: 0
        };
    }

    onSetToggle(num) {
        if(num != this.state.toggle) {
            this.setState({toggle:num});
        }
    }

    render() {
        var {toggle} = this.state;

        var noDisplay = {
            display: "none"
        };

        return(
            <div>
                <MainNav page="1" />
                <div className="experience-toggle d-flex flex-column flex-md-row">
                    <button onClick={() => {this.onSetToggle(0);}} className={"r-subheading flex-fill"+(toggle == 0 ? " bg-secondary" : " bg-darker")}>Programming</button>
                    <button onClick={() => {this.onSetToggle(1);}} className={"r-subheading flex-fill"+(toggle == 1 ? " bg-secondary" : " bg-darker")}>Work History</button>
                </div>
                <div className="container">
                    <div style={toggle == 1 ? noDisplay : {}}>
                        <Languages  />
                    </div>
                    <hr />
                    <div style={toggle == 0 ? noDisplay : {}}>
                        <Work  />
                    </div>
                    
                </div>
            </div>
        )
    }
}