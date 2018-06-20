//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class UpdateGameType extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      diggits: '',
      total_time: '',
      status: 1,
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
      id: this.props.game_type._id,
      name: this.props.game_type.name,
      diggits: this.props.game_type.diggits,
      total_time: this.props.game_type.total_time,
      status: this.props.game_type.status
    });
  }
componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.game_type._id,
      name: nextProps.game_type.name,
      diggits:nextProps.game_type.diggits,
      total_time:nextProps.game_type.total_time,
      status:nextProps.game_type.status,
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
        status: e.target.value
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
onClick(e) {
    this.update(this);
  }
update(e) {
    axios.post('/update_game_type',
      querystring.stringify({
        _id: e.state.id,
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
render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Game Type"
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
           contentLabel="Add Game Type"
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
export default UpdateGameType;