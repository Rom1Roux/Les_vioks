import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Checkbox } from 'semantic-ui-react'


// import Swal from 'sweetalert2';
// import { Button } from 'semantic-ui-react'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }

        console.log(this.state);
    }
    
    render() {

       

        console.log("test json", JSON.stringify(this.state));

        return (
            <div>
            
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h2' color='teal' textAlign='center'>
                Viens voir les Vioks
            </Header>
                <Form size='large'  action="http://192.168.15.95:5000/signup" method="post">
                <Segment stacked>   

                    <Form.Group widths='equal'>
                        <Form.Input fluid icon='user' label='Prénom' type="text" name="firstname" placeholder='Prénom'/>
                        <Form.Input fluid icon='user' label='Nom' type="text" name="lastname" placeholder='Nom'/>
                        <Form.Input fluid icon='user secret' label='Pseudo' type="text" name="pseudo" placeholder='Pseudo'/>
                        <Form.Input fluid icon='mail' label='Email' type="email" name="email"/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input voir les Vioksnput fluid icon='lock' label='Mot de passe' type="text" name="password"placeholder='Mot de Passe'/>
                        <Form.Input fluid icon='lock' label='Confirmation'type="text" name="verifpassword"placeholder='Confirme ton ****'/>  
                    </Form.Group>
                    <Checkbox label='I agree to the Terms and Conditions'/>
                    <Button color='teal' fluid size='large' type='submit'>Soumettre</Button>
            </Segment>
            </Form>
            </Grid.Column>
            </Grid>
            </div>
        )
    }
}
export default SignUp;