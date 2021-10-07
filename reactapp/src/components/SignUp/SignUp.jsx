import React, { Component } from "react";
import UserService from '../../Services/UserService'

class SignUp extends Component {

    render() {
        return (
            <div>
            <h3>Sign Up</h3>
            <form action = "@{/sign-up}" object = "${user}">
             

                <div className="form-group">
                    <label>First name*</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name*</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address*</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password*</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            </div>
        );
    }
}
export default SignUp;