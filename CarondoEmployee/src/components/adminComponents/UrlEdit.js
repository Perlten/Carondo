import React from "react"
import urlfacade from './../../facade/UrlFacade'
import { Alert, PanelGroup, Panel } from 'react-bootstrap';
import EditUrlComponent from "./EditUrlComponent";
import UrlFacade from "./../../facade/UrlFacade";

export default class UrlEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showUrls: false,
            showAlert: false
        }

    }



    editUrl = async (object) => {
        try {
            await UrlFacade.editUrl(object)
            this.setState({ showUrls: !this.state.showUrls })
            this.setState({ showAlert: true })
            setTimeout(() => this.setState({ showAlert: false }), 4000);

        } catch (e) {
            console.log(e)
        }
    }

    fetchUrls = async () => {
        try {
            const res = await urlfacade.getUrls()
            const max = res.length
            const urlsDisplay = res.map((url, i) => {
                return <EditUrlComponent url={url} key={i} editUrl={this.editUrl} lastIndex={max} />
            })
            this.setState({ urlsDisplay })
        } catch (e) {
            console.log(e)
        }
    }

    async componentDidMount() {
        this.fetchUrls()
    }



    render() {
        if (this.state.urlsDisplay) {
            return (
                <div>



                    <Alert bsStyle="success" onDismiss={this.handleDismiss} style={{ display: this.state.showAlert ? 'block' : 'none' }}>
                        <p> We did it! Url has been updated!</p>
                    </Alert>



                    <Panel id="collapsible-panel-example-2" defaultChecked>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                <strong>Edit Company Urls</strong>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <PanelGroup accordion id="accordion-example">
                                    {this.state.urlsDisplay}
                                </PanelGroup>

                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>








                </div>
            );
        }
        return (
            <div></div>
        );
    }



}

