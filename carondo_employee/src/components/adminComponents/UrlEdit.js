import React from "react"
import urlfacade from './../../facade/UrlFacade'
import { Button, Alert, PanelGroup } from 'react-bootstrap';
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

    hideShowUrls = () => {
        this.setState({ showUrls: !this.state.showUrls })
    }

    editUrl = async (object) => {
        try {
            const url = await UrlFacade.editUrl(object)
            this.hideShowUrls()
            this.setState({showAlert: true})
            console.log("Changed url: " + url)
            setInterval(() => this.setState({showAlert:false}), 4000)
        } catch (e) {
            console.log(e)
        }
    }

    fetchUrls = async () => {
        try {
            const res = await urlfacade.getUrls()
            const urlsDisplay = res.map((url, i) => {
                return <EditUrlComponent url={url} key={i} editUrl={this.editUrl} />
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

                    <Button onClick={this.hideShowUrls}>Edit Urls </Button>
                    
                    <Alert bsStyle="success" onDismiss={this.handleDismiss} style={{ display: this.state.showAlert ? 'block' : 'none' }}>
                    <p> We did it! Url has been updated!</p>
                        </Alert>

                    <div style={{ display: this.state.showUrls ? 'block' : 'none' }}>


                        <PanelGroup accordion id="accordion-example">
                            {this.state.urlsDisplay}
                        </PanelGroup>
                    </div>

                </div>
            );
        }
        return (
            <div></div>
        );
    }



}

