import React, {Component} from 'react';
import axios from 'axios'

export default class Login extends Component {
constructor(props){
    super(props)
    this.state = {
        user: null,
        typedUser: '',
        password: '',
        email: ''

    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
}

login(){
    axios.post('/api/login', {email: this.state.email, password: this.state.password }).then (res => {
        console.log(res)
        this.setState({
            user: res.data
        })
    })
}

register(){
    axios.post("/api/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.typedUser
    }).then(res => {
        console.log(res)
        this.setState({
            user: res.data
        })
    })
}

universalChangeHandler(property, value){
    this.setState({
        [property]: value
    })
}

    render(){
        
        const {typedUser, password, email} = this.state;
        return (
            <div>
                <input onChange={e => this.universalChangeHandler(e.target.name, e.target.value) } name="typedUser" value={typedUser} />
                <input name="password" value={password} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input name="email" value={email} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
               <div>
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>register</button>
                </div>
            </div>
        )
    }
}