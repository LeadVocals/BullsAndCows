//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class UpdateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      game_type: 'Hard',
      start_date: '',
      end_date: '',
      messageFromServer: '',
      modalIsOpen: false,
      data: []
    }
    this.getData = this.getData.bind(this);
this.update = this.update.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.tournament._id,
      name: this.props.tournament.name,
      game_type: this.props.tournament.game_type,
      start_date: this.props.tournament.start_date,
      end_date: this.props.tournament.end_date
    });
    this.getData(this);
  }
componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.tournament._id,
      name: nextProps.tournament.name,
      game_type:nextProps.tournament.game_type,
      start_date:nextProps.tournament.start_date,
      end_date:nextProps.tournament.end_date,
    });
    this.getData(this);
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
        game_type: e.target.value
      });
  }
handleTextChange(e) {
    if (e.target.name == "name") {
        this.setState({
          name: e.target.value
        });
      }
      if (e.target.name == "start_date") {
        this.setState({
          start_date: e.target.value
        });
      }
      if (e.target.name == "end_date") {
        this.setState({
          end_date: e.target.value
        });
      }
  }
onClick(e) {
    this.update(this);
  }
update(e) {
    axios.post('/update_tournament',
      querystring.stringify({
        _id: e.state.id,
        name: e.state.name,
        game_type: e.state.game_type,
        start_date: e.state.start_date,
        end_date: e.state.end_date
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

	  getData(ev){
	    axios.get('/getAllGameTypes')
	      .then(function(response) {
	        ev.setState({data: response.data});
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
            contentLabel="Add Tournament"
            className="Modal">
<Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>
<fieldset>
       <label for="name">Name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
       <label for="game_type">Game Type:</label>
       <select id="game_type" name="game_type" value={this.state.game_type} onChange={this.handleSelectChange}>
       	{
			              this.state.data.map(gt =>
						      <option key={gt.name} value={gt.name}>{gt.name}</option>
						    )
		}
       </select>
       <label for="start_date">Start:</label><input type="date" id="start_date" name="start_date" value={this.state.start_date} onChange={this.handleTextChange}></input>
       <label for="end_date">Start:</label><input type="date" id="end_date" name="end_date" value={this.state.end_date} onChange={this.handleTextChange}></input>
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
           contentLabel="Add Tournament"
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
export default UpdateTournament;