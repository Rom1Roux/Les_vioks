import React, { Component } from 'react';
import Tables from '../Class/Tables';
import axios from 'axios';
import { Header } from 'semantic-ui-react'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = { base: [] };
  }
  componentDidMount = () => {
    axios.post(`http://localhost:5000/vioks/user`,
      { pseudoMail: localStorage.getItem("pseudoMail") },
      { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("monToken") } })
      .then(res => {
        const base = res.data;
        this.setState({ base });
        console.log("base de donnée client : ", base);
      })
  }

  render() {
    return (

      <div>
        <Header as='h2' color='teal' textAlign='center'>
          Ci dessous, des sacrés Vioks
            </Header>
        {this.state.base.map(x =>
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

export default User;
