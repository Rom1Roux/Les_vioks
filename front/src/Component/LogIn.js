import React, {Component} from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { log } from 'util';
import Axios from 'axios';


class LogIn extends Component {
    constructor(props){
        super(props)
        this.state ={
            password : "",
            pseudoMail : ""
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state);
        Axios.post("http://192.168.15.95:5000/login", this.state)
        .then(res => {
            console.log(res.data);
            if(res.data === "auth=false"){
                alert("a malibu")
            }
            if(res.data === "auth=true"){

                alert("a palmbeach")
        }})
        
        
    }
    handleChange=(event)=>{
        console.log(event.target.name);
        this.setState({[event.target.name] : event.target.value})
    }



    render(){
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
export default LogIn;