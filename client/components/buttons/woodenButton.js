//client/components/tabs/yearTabsRouter.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class WoodenButton extends React.Component {
constructor(){
  super();
  let backgroundImage = '../../images/button.png';
  this.state={
	  		style:{
	  			'fontSize': '16px',
	  			'backgroundImage': 'url('+backgroundImage+')',
	  			'border': 'none',
	  			'backgroundSize':'cover',
	  			'backgroundPosition' : 'center',
	  			'backgroundRepeat' : 'no-repeat',
	  			'width':'50%',
	  			'height':'50px',
	  			'padding': '10 0 20 0',
	  			'cursor':'pointer',
	  			'fontFamily' : 'Comic Sans ms'
	  		}
  		}
  	this.onClick = this.onClick.bind(this);
 }
 onClick(e) {
	 if (e.target.id == "logout_button") {
	        localStorage.clear();
	        window.location.reload();
	      }
 }
 render(){
   return <button style={this.state.style} id={this.props.id} onClick={this.props.onClick}>
   	{this.props.value}
   	</button>
 }
}
export default WoodenButton;