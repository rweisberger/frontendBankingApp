import React from "react";
import { Snackbar, Alert } from "@mui/material";

function AlertComponent({open, onClose, message, type}){
    return(
        <Snackbar  
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
                }}
            open={open} 
            autoHideDuration={6000} 
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={type} variant="filled">
                <b>{message}</b>
            </Alert>
        </Snackbar>
    )
}

export default AlertComponent;