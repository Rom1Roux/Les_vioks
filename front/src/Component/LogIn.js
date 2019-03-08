import React, {Component} from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Axios from 'axios';
import User from './User';
import Admin from './Admin';


class LogIn extends Component {
    constructor(props){
        super(props)
        this.state ={
            password : "",
            pseudoMail : "",
            user : 0 // user 0 = non / user 1 = user / user 2 = admin
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state);
        Axios.post("http://192.168.15.95:5000/login", this.state)
        .then(res => {
            console.log(res.data);
            if(res.data === "auth=false"){
                alert("c'estpas bon")
                this.setState({user: 0});
            }
            if(res.data === "auth=trueUser"){
                alert("c'est OK");
                this.setState({user: 1});
            }
            if(res.data === "auth=trueAdmin"){
                alert("c'est OK");
                this.setState({user: 2});
            }
        }) 
    }
    handleChange=(event)=>{
        console.log(event.target.name);
        this.setState({[event.target.name] : event.target.value})
    }



    render(){
        if (this.state.user === 2){
            return (
                <div className='titreBdd'>
                <Admin />
            </div>
            )
        }
        else if (this.state.user === 1){
            return (
                <div className='titreBdd'>
                <User />
            </div>
            )
        }
        else {
            return(
                <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    Viens voir les Vioks
                </Header>
                <Form onSubmit= {this.handleSubmit}size='large' action="http://192.168.15.95:5000/login" method="post">
                <Segment stacked>

                <Form.Input fluid icon='user' iconPosition='left' placeholder='vioks@wild.com ou SuperViok' label = "Pseudo ou mail" className="inputPseudo" type="text" name="pseudoMail" onChange={this.handleChange}/>

                <Form.Input fluid icon='lock'
                iconPosition='left'
                placeholder='superMot2passe'
                type='password' label = "Mot de passe" className="inputverifPassword" name="password" onChange={this.handleChange}/>

                <Button color='teal' fluid size='large' type="submit" >Se connecter</Button>
                </Segment>
                </Form>
                </Grid.Column>
                </Grid>
                </div>
            )
        }
    }
}
export default LogIn;