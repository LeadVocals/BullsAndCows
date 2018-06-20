//client/components/GameTypes.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import AddGameType from './AddGameType';
import UpdateGameType from './UpdateGameType';
import DeleteGameType from './DeleteGameType';
import $ from 'jquery';

var querystring = require('querystring');
class GameTypes extends React.Component {
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
    	$("#game_types_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    
    getData(ev){
	    axios.get('/getAllGameTypes')
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="game_types_div" style={this.state.style}>
		     	<center><WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME"></WoodenButton> <br /></center>
		   	
		   		
		   		<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Name</th>
				            <th className='button-col'>Diggits</th>
				            <th className='button-col'>Total time</th>
				            <th className='button-col'>Status</th>
				            <th className='button-col'>Update</th>
				            <th className='button-col'>Delete</th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(gt){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{gt.name}</td>
				                <td className='button-col'>{gt.diggits}</td>
				                <td className='button-col'>{gt.total_time}</td>
				                <td className='button-col'>{gt.status}</td>
				                <td className='button-col'><UpdateGameType game_type={gt} /></td>
				                <td className='button-col'><DeleteGameType id={gt._id} game_type={gt} /></td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
				<center><AddGameType /></center>

		   	</Thumbnail>
   		</div>
      )
   }
}
export default GameTypes;