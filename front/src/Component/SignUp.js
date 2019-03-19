import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Checkbox, } from 'semantic-ui-react'
import Axios from 'axios';
import Swal from 'sweetalert2'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            etat: 0,
        }
        this.clickMenu = this.clickMenu.bind(this);
        this.inputFirstName = this.inputFirstName.bind(this);
        this.inputLastName = this.inputLastName.bind(this);
        this.inputPseudo = this.inputPseudo.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.inputVerifPassword = this.inputVerifPassword.bind(this);
    }
    inputFirstName = (event) => {
        this.setState({ firstname: event.target.value });
        console.log(this.state);
    }
    inputLastName = (event) => {
        this.setState({ lastname: event.target.value });
        console.log(this.state);
    }
    inputPseudo = (event) => {
        this.setState({ pseudo: event.target.value });
        console.log(this.state);
    }
    inputEmail = (event) => {
        this.setState({ email: event.target.value });
        console.log(this.state);
    }
    inputPassword = (event) => {
        this.setState({ password: event.target.value });
        console.log(this.state);
    }
    inputVerifPassword = (event) => {
        this.setState({ verifpassword: event.target.value });
        console.log(this.state);
    }
    clickMenu = (event) => {
        event.preventDefault()
        Axios.post("http://localhost:5000/signup", this.state)
            .then(res => {
                console.log("res.data", res.data);
                if (res.data === "signupError") {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Profil introuvable',
                        footer: '<a href>Retente ta chance</a>'
                    })
                }
                else if (res.data === "signupValid") {
                    this.setState({ etat: 1 });
                    Swal.fire({
                        type: 'success',
                        title: 'Vous êtes inscrit',
                        text: 'Entre chez les Vioks',
                        footer: '<a href>a tes risques et perils</a>'
                    })
                }
            })
    }
    render() {
        return (
            <div className='titreBdd'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column textAlign='left' style={{ maxWidth: 1000 }}>
                        <Header as='h2' color='teal' textAlign='center'>Viens voir les Vioks</Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Group widths='equal'>
                                    <Form.Input onChange={this.inputFirstName} fluid icon='user' label='Prénom' type="text" name="firstname" />
                                    <Form.Input onChange={this.inputLastName} fluid icon='user' label='Nom' type="text" name="lastname" />
                                    <Form.Input onChange={this.inputPseudo} fluid icon='user secret' label='Pseudo' type="text" name="pseudo" />
                                    <Form.Input onChange={this.inputEmail} fluid icon='mail' label='Email' type="email" name="email" />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input onChange={this.inputPassword} fluid icon='lock' label='Mot de passe' type="text" name="password" />
                                    <Form.Input onChange={this.inputVerifPassword} fluid icon='lock' label='Confirmation' type="text" name="verifpassword" />
                                </Form.Group>
                                <Checkbox label='I agree to the Terms and Conditions' />
                                <Button color='teal' fluid size='large' type='submit' onClick={this.clickMenu}>Soumettre</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
export default SignUp;