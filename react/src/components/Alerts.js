import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

    static propTypes ={
        error: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, alert, messages } = this.props;
        if(error !== prevProps.error){
        if(error.msg.error) alert.error(error.msg.error);
        if (error.msg && error.status === 10401) alert.error(error.msg);
        if(error.msg.name) alert.error("NAME: "+error.msg.name.join());
        if(error.msg.username) alert.error("USERNAME: "+error.msg.username.join());
        if(error.msg.password) alert.error("PASSWORD: "+error.msg.password.join());
        if(error.msg.role) alert.error("ROLE: "+error.msg.role.join());
        if(error.msg.quantity) alert.error("QUANTITY: "+error.msg.quantity.join());
        if(error.msg.medicines) alert.error("MEDICINE: "+error.msg.medicines.join());
        if(error.msg.medicine) alert.error("MEDICINE: "+error.msg.medicine.join());
        if(error.msg.diagnostic) alert.error("Diagnostic: "+error.msg.diagnostic.join());
        if(error.msg.diagnostics) alert.error("diagnostic: "+error.msg.diagnostics.join());
        if(error.msg.ssn) alert.error("SSN: "+error.msg.ssn.join());
        if(error.msg.admited_on) alert.error("Admited on: "+error.msg.admited_on.join());
        if(error.msg.address)alert.error("Address: "+error.msg.address.join());
        if(error.msg.state)alert.error("State: "+error.msg.state.join());
        if(error.msg.city)alert.error("City: "+error.msg.city.join());
        if(error.msg.age)alert.error("AGE: "+error.msg.age.join());
        }

        if(messages !== prevProps.messages){
        alert.success(messages.msg);
        }
    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = (state) =>({
    error: state.errors,
    messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));