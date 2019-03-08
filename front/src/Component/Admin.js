import React, { Component } from 'react';
import Tables from '../Class/Tables';
import axios from 'axios';
import {Header} from 'semantic-ui-react'


class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {base : []};
  }
  componentDidMount = () =>{
    axios.get(`http://192.168.15.95:5000/vioks`)
      .then(res => {
        const base = res.data;
        this.setState({ base });
        console.log("base de donnée client : ",base);
      })       
    }

  render() {
    return (
      
        <div>
            <Header as='h2' color='teal' textAlign='center'>
                Ci dessous, des sacrés Vioks
            </Header>
        { this.state.base.map(x =>     
            <Tables firstname={x.firstname}
                    lastname={x.lastname}
                    pseudo={x.pseudo}
                    email={x.email}
            />
        )}
        </div>
      
    );
  }
}

export default Admin;
