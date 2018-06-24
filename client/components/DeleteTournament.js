//client/components/Delete.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class DeleteTournament extends React.Component {
constructor(){
  super();
  this.state={id: ''};
  this.onClick = this.onClick.bind(this);
  this.delete = this.delete.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.tournament._id
    })
  }
componentWillReceiveProps(nextProps){
  this.setState({
    id: nextProps.tournament._id
  })
  }
onClick(e){
     this.delete(this);
    }
delete(e){
    axios.get('/delete_tournament?id='+e.state.id)
      .then(function(response) {
      	window.location.reload();
	});
}
render(){
  return (
    <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
     <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                  <span className="glyphicon glyphicon-remove"></span>
         </Link>
    </Button>
)
 }
}
export default DeleteTournament;