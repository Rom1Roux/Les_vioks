import React, { Component } from 'react';
import Tables from '../Class/Tables';
import axios from 'axios';
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { base: [] };

  }
  componentDidMount = () => {
    console.log("constructor", this.props.flash);
    axios.post(`http://localhost:5000/vioks/user`,
      { pseudoMail: this.props.pseudoMail },
      { headers: { 'Authorization': 'Bearer ' + this.props.flash } })
      .then(res => {
        const base = res.data;
        this.setState({ base });
        console.log("base de donnée client : ", base);
      })
  }
  render() {
    return (
      <div>
        <Header as='h2' color='teal' textAlign='center'>Ci dessous, des sacrés Vioks</Header>
        {this.state.base.map(x =>
          <Tables firstname={x.firstname} lastname={x.lastname} pseudo={x.pseudo} email={x.email} />
        )}
      </div>
    );
  }
}
const mapStateToProps = (store) =>
  ({
    flash: store.auth.token,
    pseudoMail: store.auth.pseudoMail,
  });
export default connect(mapStateToProps)(User);
