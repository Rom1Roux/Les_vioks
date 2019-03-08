import React, {Component} from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';



class Acceuil extends Component {
    constructor(props){
        super(props)
        this.state ={
            etat : 0,
            auth : false

        }
    }
    componentDidMount =()=>{
        axios.get(`http://192.168.15.95:5000/auth`)
      .then(res => {
        const auth = res;
        console.log("confirmation auth : ",auth);
      })
    }

    goSignIn=()=>{
        this.setState({ etat : 1})
    }
    gologIn=()=>{
        this.setState({ etat : 2})
    }

    render(){
        if (this.state.etat === 1){
            return <SignUp/>
        }
        else if (this.state.etat === 2){
            return <LogIn/>
        }
        return(
            <div className='titreBdd'>
            <Grid color='teal'textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Bienvenue chez les Vioks !!
                    </Header>
                    <Form size='large' className= "button">
                        <Segment stacked>
                            <Button  color='teal' circular  size ="massive" value="Sign'in"onClick ={this.goSignIn}>Inscription</Button>
                            <Button  color='teal' circular  size ="massive" value="Log'in" onClick={this.gologIn}> Connexion</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>   
            
            </div>
        )
    }
}
export default Acceuil;