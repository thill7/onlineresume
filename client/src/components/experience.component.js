import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHistory } from '@fortawesome/free-solid-svg-icons';
import MainNav from './mainnav.component';
import Languages from './languages.component';
import Work from './work.component';
import '../styles/mainnav.scss';
import '../styles/experience.scss';

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
                <div className="experience-toggle d-flex flex-column flex-md-row my-4">
                    <button onClick={() => {this.onSetToggle(0);}} className={"r-subheading flex-fill"+(toggle == 0 ? " bg-secondary" : " bg-color-primary-variant")}>Programming <FontAwesomeIcon icon={faCode}/></button>
                    <button onClick={() => {this.onSetToggle(1);}} className={"r-subheading flex-fill"+(toggle == 1 ? " bg-secondary" : " bg-color-primary-variant")}>Work History <FontAwesomeIcon icon={faHistory} /></button>
                </div>
                <div className="container">
                    <div style={toggle == 1 ? noDisplay : {}}>
                        <Languages  />
                    </div>
                    <div style={toggle == 0 ? noDisplay : {}}>
                        <Work  />
                    </div>
                </div>
            </div>
        )
    }
}