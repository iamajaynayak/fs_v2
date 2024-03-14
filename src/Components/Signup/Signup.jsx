import React from 'react';
import { FormInput, CustomButton } from '../index.js';
import { createUserProfileDocument, createUser } from '../../firebase/firebase.js';
import { setLoadinState } from '../../redux/loading/loadingAction.js';
import { connect } from 'react-redux';



import './signup.css';

class Signup extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert('Your password did not match');
			return
		}

		this.props.setLoading()
		try {
			const user = await createUser({ email, password });
			await createUserProfileDocument(user, { displayName });
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			})
		}
		catch (error) {
			console.log('error signing up', error.message);
		}
		this.props.setLoading()
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value })
	}


	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className="sign-up">
				<h2>I do not have an account </h2>
				<span>create account with email and password </span>
				<form className='form-input' onSubmit={this.handleSubmit}>
					<FormInput type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						label='Display Name'
						required />

					<FormInput type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						label='Email'
						required />

					<FormInput type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						label='Password'
						required />

					<FormInput type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						required />

					<CustomButton type='submit'>Sign Up</CustomButton>
				</form>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setLoading: () => dispatch(setLoadinState())
})

export default connect(null, mapDispatchToProps)(Signup);
