//client/components/Delete.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class DeleteGameType extends React.Component {
constructor(){
  super();
  this.state={id: ''};
  this.onClick = this.onClick.bind(this);
  this.delete = this.delete.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.game_type._id
    })
  }
componentWillReceiveProps(nextProps){
  this.setState({
    id: nextProps.game_type._id
  })
  }
onClick(e){
     this.delete(this);
    }
delete(e){
    axios.get('/delete_game_type?id='+e.state.id)
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
export default DeleteGameType;