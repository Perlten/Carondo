import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';
import carImg from './../../resources/car.png';

export default class ShowEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emp: this.props.emp,
            message: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        const emp = JSON.parse(JSON.stringify(nextProps.emp));
        this.setState({ emp });
    }

    render() {
        if (!this.props.emp) {
            return <img src={carImg} alt="Car" />
        }
        return (
            <div>
                <h1>User information:</h1>
                <h2 style={{ color: "red" }}>{this.state.message}</h2>
                <form onKeyUp={this.enterPress}>
                    <FormGroup>
                        <ControlLabel>
                            Id
                        </ControlLabel>
                        <FormControl
                            id="id"
                            type="text"
                            value={this.state.emp.id}
                            disabled
                        />
                        <ControlLabel>
                            First name
                        </ControlLabel>
                        <FormControl
                            id="firstName"
                            type="text"
                            value={this.state.emp.firstName}
                            placeholder="First name"
                            onChange={this.handleChange}
                            required
                        />
                        <ControlLabel>
                            Last name
                        </ControlLabel>
                        <FormControl
                            id="lastName"
                            type="text"
                            value={this.state.emp.lastName}
                            placeholder="Last name"
                            onChange={this.handleChange}
                            required
                        />
                        <ControlLabel>
                            Email
                        </ControlLabel>
                        <FormControl
                            id="email"
                            type="email"
                            value={this.state.emp.email}
                            placeholder="Email"
                            onChange={this.handleChange}
                            required
                        />
                        <ControlLabel>Role</ControlLabel>
                        <br />
                        <RoleDropDownOptions handleChange={this.handleDropDown} role={this.state.emp.role} />
                    </FormGroup>
                    <Button bsStyle="warning" onClick={this.handleSubmit}>Edit</Button>{' '}
                    <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                </form>
            </div >
        );
    }

    enterPress = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const emp = this.state.emp
        emp[id] = value;
        this.setState({ emp });
        console.log(this.state.emp)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const emp = this.state.emp;
        const res = await empFacade.edit(emp);
        if (res.status !== 200) {
            this.setState({ message: res.fullError.errorMessage })
            return;
        }
        this.setState({ message: "Successful!" })
        this.props.updateEmp(res.emp);
    }

    handleDelete = async (e) => {
        e.preventDefault()
        const emp = this.state.emp
        const res = await empFacade.delete(emp)
        if (res.status !== 200) {
            this.setState({ message: res.fullError.errorMessage })
            return;
        }
        this.setState({ message: "User deleted!" })
        this.props.deleteEmp(res.emp)
    }

    handleDropDown = (e) => {
        const emp = this.state.emp;
        emp.role = e;
        this.setState({emp});
    }
}

function RoleDropDownOptions({ role, handleChange }) {
    return (
        <DropdownButton
            bsStyle="primary"
            bsSize="small"
            title={role}
            id="role"
            onSelect={handleChange}
        >
            <MenuItem eventKey="statistician" active={role === "statistician"}>Statistician</MenuItem>
            <MenuItem eventKey="admin" value="statistician" active={role === "admin"}>Admin</MenuItem>
        </DropdownButton>

    );
}