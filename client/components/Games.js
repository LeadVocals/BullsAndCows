//client/components/Settings.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Thumbnail } from 'react-bootstrap';
import WoodenButton from './buttons/woodenButton';
import $ from 'jquery';

var querystring = require('querystring');
class Games extends React.Component {
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
	  
    }
    onClick(e) {
 		if (e.target.id == "home_button") {
	        this.changePage('home');
	      }
	     
	    }
    changePage(page){
    	$("#games_div").css('display','none');
    	$("#"+page+"_div").css('display','block');
    }
    componentDidMount() {
	    this.getData(this);
	  }
	  componentWillReceiveProps(nextProps) {
	    this.getData(this);
	  }
    getData(ev){
	    axios.get('/getAllActiveGames')
	      .then(function(response) {
	        ev.setState({data: response.data});
	      });
	  }
	    
render() {
      return (
        <div>	      
		     <Thumbnail id="games_div" style={this.state.style}>
		     	<WoodenButton id="home_button" style="width:25% !important" onClick={this.onClick} value="HOME">
		     	</WoodenButton>
		     	<br />
		     			<table>
			          <thead>
			            <tr>
				            <th></th>
				            <th className='button-col'>Name</th>
				            <th className='button-col'>Diggits</th>
				            <th className='button-col'>Total time</th>
				            <th className='button-col'></th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.data.map(function(gt){
			                return  <tr>
				                <td className='counterCell'></td>
				                <td className='button-col'>{gt.name}</td>
				                <td className='button-col'>{gt.diggits}</td>
				                <td className='button-col'>{gt.total_time} seconds</td>
				                <td className='button-col'>
					                <WoodenButton id="" onClick={() => {
					                	window.localStorage.setItem('gt',gt._id);
					                	window.localStorage.setItem('diggits',gt.diggits);
					                	window.localStorage.setItem('total_time',gt.total_time);
					                	window.location.reload();
					                	}
					                	} 
					                	style="width:25% !important" value="PLAY">
			     					</WoodenButton>
				                </td>
			                </tr>
			              })
			            }
			            </tbody>
				</table>
		   	</Thumbnail>		   	
   		</div>
      )
   }
}
export default Games;