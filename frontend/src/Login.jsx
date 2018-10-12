import React, { Component } from 'react'
import { connect } from 'react-redux';
import { submitLogin } from './store';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.loginClicked = this.loginClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    loginClicked(event) {
        event.preventDefault();
        this.props.submitLogin(this.state.email);
    }

    onInputChange(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        return (
            <div className="login">
                <form>
                    <input type="text" onChange={this.onInputChange} placeholder="Skriv inn epost her" /><br />
                    <input type="submit" value="Logg inn" onClick={this.loginClicked} />
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        submitLogin: email => {
            props.history.push("/");
            dispatch(submitLogin(email));
        }
    }
}

export default withRouter(connect(undefined, mapDispatchToProps)(Login));