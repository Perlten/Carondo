import React from 'react';
import {Button} from 'react-bootstrap';
import {removeToken} from './../facade/FacadeUtils';


export default function LogoutButton({style, history}){
    return(
        <div>
            <Button bsStyle="danger" style={style} onClick={() => logout(history)}>Logout</Button>
        </div>
    );
}

function logout(history){
    removeToken();
    history.push("/");
}