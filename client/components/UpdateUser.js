//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      username: '',
      password: '',
      role: '',
      messageFromServer: '',
      modalIsOpen: false
    }
this.update = this.update.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.user._id,
      name: this.props.user.name,
      username: this.props.user.username,
      password: this.props.user.password,
      role: this.props.user.role
    });
  }
componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.user._id,
      name: nextProps.user.name,
      username:nextProps.user.username,
      password:nextProps.user.password,
      role:nextProps.user.role,
    })
  }
openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }
handleSelectChange(e) {
      this.setState({
        role: e.target.value
      });
  }
handleTextChange(e) {
    if (e.target.name == "name") {
      this.setState({
        name: e.target.value
      });
    }
	if (e.target.name == "username") {
      this.setState({
        username: e.target.value
      });
    }
    if (e.target.name == "password") {
      this.setState({
        password: e.target.value
      });
    }
  }
onClick(e) {
    this.update(this);
  }
update(e) {
    axios.post('/update_user',
      querystring.stringify({
        _id: e.state.id,
        name: e.state.name,
        username: e.state.username,
        password: e.state.password,
        role: e.state.role
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
});
  }
render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add User"
            className="Modal">
<Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>
<fieldset>
       <label for="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
       <label for="username">Email:</label><input type="text" id="username" name="username" value={this.state.username} onChange={this.handleTextChange}></input>
       <label for="password">Password:</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.handleTextChange}></input>
       <label for="role">Role:</label><select id="role" name="role" value={this.state.role} onChange={this.handleSelectChange}>
            <option value="client" id="client">Client</option>
            <option value="administrator" id="administrator">Administrator</option>
         </select>
      </fieldset>
<div className='button-center'>
              <br/>
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>Update</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return (
        <div>
         <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Add User"
           className="Modal">
<div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
        </div>
        )
      }
  }
}
export default UpdateUser;