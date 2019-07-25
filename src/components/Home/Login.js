import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      typedUser: "",
      password: "",
      email: "",
      loading: false
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login() {
    this.setState({
      loading: true
    });
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        this.props.setUser(res.data);
        this.setState({
          loading: false
        });
      });
  }

  register() {
    axios
      .post("/api/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.typedUser
      })
      .then(res => {
        console.log(res);
        this.props.setUser(res.data);
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    console.log(`coming from redux =>`, this.props.user);
    const { typedUser, password, email, loading } = this.state;
    return (
    
        <div>
        {loading ? (
          <img src="https://media.tenor.com/images/e420aec0db9728d114abce63b882074f/tenor.gif" />
        ) : (
          <div className="login-container">
            <input
              name="typedUser"
              placeholder="username"
              value={typedUser}
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
            />
            <input
              placeholder="email"
              name="email"
              type="email"
              value={email}
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
            />
            <div>
              <button onClick={this.login}> Login</button>
              <button onClick={this.register}> register</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapReduxToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  setUser
};

const connectInvoked = connect(
  mapReduxToProps,
  mapDispatchToProps
);

export default connectInvoked(Login);
