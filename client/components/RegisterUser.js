//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WoodenButton from './buttons/woodenButton'
var querystring = require('querystring');
class RegisterUser extends React.Component {
constructor() {
      super();
	  this.state = {
        name: '',
        username: '',
        password: '',
        role: '',
        messageFromServer: '',
        modalIsOpen: false
      }
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewUser = this.insertNewUser.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
	closeModal() {
      this.setState({
        modalIsOpen: false,
        name: '',
        username: '',
        password: '',
        messageFromServer: ''
      });
    }
	    
	handleSelectChange(e) {
	      if (e.target.name == 'role') {
	        this.setState({
	          role: e.target.value
	        });
	      }
	    }
	onClick(e) {
	      this.insertNewUser(this);
	    }
	insertNewUser(e) {
	      axios.post('/register_user',
	        querystring.stringify({
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
	    
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
      <WoodenButton style="width:25% !important" onClick={this.openModal} value="REGISTER"></WoodenButton>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="REGISTER"
       className="Modal">
<Link to={{pathname: '/', search: '?username='+this.state.username}} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
       <label for="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
       <label for="username">Email:</label><input type="email" id="username" name="username" value={this.state.username} onChange={this.handleTextChange}></input>
       <label for="password">Password:</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.handleTextChange}></input>
       <label for="role">Role:</label><select id="role" name="role" value={this.state.role} onChange={this.handleSelectChange}>
            <option value="client" id="client">Client</option>
            <option value="administrator" id="administrator">Administrator</option>
         </select>
      </fieldset>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>REGISTER</Button>
       </div>
          </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Register"
        className="Modal">
<div className='button-center'>
        <h3>{this.state.messageFromServer}</h3>
        <Link to={{pathname: '/', search: '?username='+this.state.username}} style={{ textDecoration: 'none' }}>
         <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
        </Link>
       </div>
      </Modal>
       </div>
     )
    }
   }
}
export default RegisterUser;