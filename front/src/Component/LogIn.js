import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Axios from 'axios';
import Swal from 'sweetalert2';

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            pseudoMail: "",
            user: 0 // user 0 = non / user 1 = user / user 2 = admin
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        Axios.post("http://localhost:5000/login", this.state)
            .then(res => {
                console.log(res.data);
                if (res.data.auth === false) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Profil introuvable',
                        footer: '<a href>Retente ta chance</a>'
                    })
                    this.setState({ user: 0 });
                }
                if (res.data.auth === true) {
                    this.setState({ user: 1 });
                    localStorage.setItem('monToken', res.data.token);
                    localStorage.setItem('pseudoMail', this.state.pseudoMail);
                    this.props.history.push('/user');
                }
            })
    }
    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({ [event.target.name]: event.target.value })
    }
    clickMenu = () => {
        this.setState({ user: 3 })
    }
    render() {
        return (
            <div className='titreBdd'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Viens voiifr les Vioks</Header>
                        <Form onSubmit={this.handleSubmit} size='large' action="localhost:5000/login" method="post">
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='vioks@wild.com ou SuperViok' label="Pseudo ou mail" className="inputPseudo" type="text" name="pseudoMail" onChange={this.handleChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='superMot2passe' type='password' label="Mot de passe" className="inputverifPassword" name="password" onChange={this.handleChange} />
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