//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WoodenButton from './buttons/woodenButton'
var querystring = require('querystring');
class UserLogin extends React.Component {
constructor() {
      super();
	  this.state = {
        username: '',
        password: '',
        messageFromServer: '',
        modalIsOpen: false
      }
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.userLogin = this.userLogin.bind(this);
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
        username: '',
        password: '',
        messageFromServer: ''
      });
    }

	onClick(e) {
	      this.userLogin(this);
	    }
	userLogin(e) {
	      axios.post('/user_login',
	        querystring.stringify({
	          username: e.state.username,
	          password: e.state.password
	        }), {
	          headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	          }
	        }).then(function(response) {
	        	if(typeof(response.data[0])!='undefined' && response.data[0]!=null){
	        		if(typeof(response.data[0]._id)!='undefined' && response.data[0]._id!=null){
		        		e.setState({
					    	messageFromServer: 'SUCESSFUL LOGIN FOR USER ID: ' + response.data[0]._id
					    });
					    window.localStorage.setItem("username",response.data[0].username);
					    window.localStorage.setItem("user_role",response.data[0].role);
		        	}else{
		        		e.setState({
					    	messageFromServer: "USER NOT EXISTS!"
					    });
		        	}
	        	}else{
	        		e.setState({
				    	messageFromServer: "USER NOT EXISTS!"
				    });
	        	}
	        
	      });
	    }
	handleTextChange(e) {
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
      <WoodenButton style="width:25% !important" onClick={this.openModal} value="LOGIN"></WoodenButton>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="LOGIN"
       className="Modal">
<Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
       <label for="username">Email:</label><input type="email" id="username" name="username" value={this.state.username} onChange={this.handleTextChange}></input>
       <label for="password">Password:</label><input type="password" id="password" name="password" value={this.state.password} onChange={this.handleTextChange}></input>
</fieldset>
<div className='button-center'>
        <br/>
        <Button onClick={this.onClick}>LOGIN</Button>
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
        contentLabel="Login"
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
export default UserLogin;