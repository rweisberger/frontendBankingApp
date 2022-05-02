import React from "react";
import { Snackbar, Alert } from "@mui/material";

function AlertComponent(props){
    return(
        <Snackbar  
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
                }}
            open={props.open} 
            autoHideDuration={6000} 
            onClose={props.onClose}
        >
            <Alert onClose={props.onClose} severity={props.type} variant="filled">
                <b>{props.message}</b>
            </Alert>
        </Snackbar>
    )
}

export default AlertComponent;