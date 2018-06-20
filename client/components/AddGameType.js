//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WoodenButton from './buttons/woodenButton';
import $ from 'jquery';

var querystring = require('querystring');
class AddGameType extends React.Component {
constructor() {
      super();
	this.state = {
        name: '',
        diggits: '',
        total_time: '',
        status: 1,
        messageFromServer: '',
        modalIsOpen: false
      }
	this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewGameType = this.insertNewGameType.bind(this);
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
        diggits: '',
        total_time: '',
        status: 1,
        messageFromServer: ''
      });
    }

	handleSelectChange(e) {
        this.setState({
          status: e.target.value
        });
    }
	onClick(e) {
      this.insertNewGameType(this);
    }
	insertNewGameType(e) {
      axios.post('/insert_game_type',
        querystring.stringify({
          name: e.state.name,
          diggits: e.state.diggits,
          total_time: e.state.total_time,
          status: e.state.status
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
	 if (e.target.name == "diggits") {
        this.setState({
          diggits: e.target.value
        });
      }
      if (e.target.name == "total_time") {
        this.setState({
          total_time: e.target.value
        });
      }
    }
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
      <WoodenButton style="width:25% !important" onClick={this.openModal} value="ADD GAME TYPE"></WoodenButton>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="NEW GAME TYPE"
       className="Modal">
<Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
       <label for="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
       <label for="diggits">Diggits:</label><input type="number" id="diggits" name="diggits" value={this.state.diggits} onChange={this.handleTextChange}></input>
       <label for="total_time">Total time:</label><input type="number" id="total_time" name="total_time" value={this.state.total_time} onChange={this.handleTextChange}></input>
       <label for="status">Status:</label><select id="status" name="status" value={this.state.status} onChange={this.handleSelectChange}>
            <option value="1" id="1">1</option>
            <option value="0" id="0">0</option>
         </select>
      </fieldset>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>NEW GAME TYPE</Button>
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
        contentLabel="New game type"
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
export default AddGameType;