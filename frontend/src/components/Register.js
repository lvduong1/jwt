import React, { Component } from 'react';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
//
import { registerUser } from '../actions/authentication';
//
class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value        })
    }

    handleSubmit(e) {
        console.log(this.props.history);
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        console.log('cwrp');
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('gdsfp');
        if(nextProps.errors !== prevState.errors){
            return { 
                errors: nextProps.errors 
            };
        }
        return null;
    }
    render() {
        console.log('render register');
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className= {classnames('form-control form-control-lg', {'is-invalid': errors.name})}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className = { classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className= { classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className= {classnames('form-control form-control-lg', {'is-invalid': errors.password_confirm })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && <div className="invalid-feedback">{errors.password_confirm}</div>}

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    registerUser: (user, history) => dispatch(registerUser(user, history))
});

export default connect(
    mapStateToProps,
    // { registerUser}
    mapDispatchToProps
    // mapDispatchToProps
)(withRouter(Register))