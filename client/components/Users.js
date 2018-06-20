//client/components/GameTypes.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import RegisterUser from './RegisterUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import $ from 'jquery';

var querystring = require('querystring');
class Users extends React.Component {
constructor() {
      super();
      let backgroundImage = '../../images/inside_bg.jpg';
      this.onClick = this.onClick.bind(this);
	  this.state={
		  		style:{
		  			'fontSize': '16px',
		  			'backgroundImage': 'url('+backgroundImage+')',
		  			'display': 'none',
		  			'backgroundSize':'cover',
		  			'width':'100%',
		  			'maxWidth':'500px',
		  			'height':'666px',
		  			'maxHeight':'666px'
		  		},
		  		data: []    
	  		}
	  this.getData = this.getData.bind(this);
	  
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
	        this.changePage('home');
	      }
	      
	    }
    changePage(page){
    	$("#users_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    
    getData(ev){
	    axios.get('/getAllUsers')
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="users_div" style={this.state.style}>
		     	<center><WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME"></WoodenButton> <br /></center>
		   	
		   		
		   		<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Name</th>
				            <th className='button-col'>Username</th>
				            <th className='button-col'>Role</th>
				            <th className='button-col'>Update</th>
				            <th className='button-col'>Delete</th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(user){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{user.name}</td>
				                <td className='button-col'>{user.username}</td>
				                <td className='button-col'>{user.role}</td>
				                <td className='button-col'><UpdateUser user={user} /></td>
				                <td className='button-col'><DeleteUser id={user._id} user={user} /></td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
				<center><RegisterUser /></center>

		   	</Thumbnail>
   		</div>
      )
   }
}
export default Users;