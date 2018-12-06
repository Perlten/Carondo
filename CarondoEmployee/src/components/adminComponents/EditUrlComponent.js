import React from "react"
import { FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';

export default class EditUrlComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            company: this.props.url.company,
            url: this.props.url.url,

            // Had to do this to make IDs for the form, otherwise u get browser error, has to be unique ids
            companyid: "company." + this.props.url.id,
            urlid: "url." + this.props.url.id
        }
        console.log(props)
    }


    handleChange = (e) => {
        console.log(e.target.value)
        var res = e.target.id.split(".");
        console.log(res[0])
        if (res[0] === "company") {
            this.setState({ company: e.target.value })
        } else {
            this.setState({ url: e.target.value })
        }
    }

    handleSubmit = () => {
        const object = {
            id: this.props.url.id,
            company: this.state.company,
            url: this.state.url
        }
        console.log("object to send:" + JSON.stringify(object))
        this.props.editUrl(object)
    }

    render() {
        var isLast = false;
        if (this.props.lastIndex === this.props.url.id) {
            isLast = true;
        }

        return (
            <div>
                <Panel eventKey={this.props.url.id}>
                    <Panel.Heading>
                        <Panel.Title toggle><strong>{this.props.url.company}</strong> Edit Url</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <FormGroup>
                            <ControlLabel>
                                Company
                                        </ControlLabel>
                            <FormControl
                                id={this.state.companyid}
                                type="text"
                                value={this.state.company}
                                placeholder={this.state.company}
                                onChange={this.handleChange}
                                disabled
                            />
                            <ControlLabel>
                                URL
                                         </ControlLabel>
                            <FormControl
                                id={this.state.urlid}
                                type="text"
                                value={this.state.url}
                                placeholder={this.state.url}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button bsStyle="success" onClick={this.handleSubmit}>Edit</Button>

                    </Panel.Body>
                </Panel>
                <BreakLine checkIfLast={isLast} />
            </div>
        )
    }

}

function BreakLine(props) {
    if (!props.checkIfLast) {
        return (
            <div>
                <br />
            </div>
        );
    }
    return (
        <div></div>
    )
}