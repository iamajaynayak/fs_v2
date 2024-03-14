import React from "react";
import { FormInput, CustomButton } from "../index.js";
import { signIn } from "../../firebase/firebase.js";
import { connect } from 'react-redux';
import { setLoadinState } from '../../redux/loading/loadingAction.js';
import "./signin.css";



class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event, type = "EMAIL") => {
    this.props.setLoading()
    event.preventDefault();
    try {
      if(type === "EMAIL") {
        const { email, password } = this.state;
        await signIn("EMAIL", {email, password});
      }else{
        await signIn("GOOGLE")
      }
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
    this.props.setLoading()
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signin">
        <div className="mobile-title">
          <h2 className="signin-title">I already have an account</h2>
          <span className="signin-subtitle">
            Signin with your Email and Password
          </span>
        </div>
        <form onSubmit={e => this.handleSubmit(e, "EMAIL")}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
          />
          <div className="button">
            <CustomButton type="submit">Sign In </CustomButton>
            <CustomButton onClick={e => this.handleSubmit(e,"GOOGLE")} isGoogleSignedIn>
              Google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
	setLoading: () => dispatch(setLoadinState())
})

export default connect(null, mapDispatchToProps)(Signin);
