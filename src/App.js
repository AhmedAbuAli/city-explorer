import './App.css';
import axios from 'axios';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			userInput : '',
			allCity : {},
			map : {},
			display_name : '',
			latitude:'',
			longitude:''
		}
	}

	getCityInfo = async(e) => {
	e.preventDefault();
	try {
console.log(process.env.REACT_APP_KEY)
		const cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${e.target.userCityInput.value}&format= json`)
		console.log(cityData.data)
		this.setState({
			userInput : e.target.userCityInput.value,
			allCity : cityData.data[0],
			display_name : cityData.data[0].display_name,
			latitude : cityData.data[0].lat ,
			longitude : cityData.data[0].lon ,
			displayError : false
		 })
		}
catch (error){

		this.setState({
			displayError : true , 
			errorMessage : error.response.status,
			display_name : ""

		
		})


	}
	} 
	render(){
		return (
   		 <div className="App">
			<h1>{process.env.REACT_APP_TITLE} </h1>
			{this.state.displayError && 

			<>
			      <Alert variant="danger" >
        				<Alert.Heading>oops ! , Looks Like you searched for the wrong city !</Alert.Heading>
        					<p>
							please make sure that you wrote the city name correct and retry again
        					</p>
     			 </Alert>

			</>

}
   			 <Form style={{width:'50%' , margin:'auto'}} onSubmit={this.getCityInfo}>
      				<Form.Group className="mb-3" >
				 <Form.Label htmlFor='text' id="userCityInput"></Form.Label>
      				  <Form.Control type="text" placeholder="City Name" id="userCityInput"/>
      				  <Form.Text className="text-muted">
     				     You can search for your city here !
      				  </Form.Text>
      				</Form.Group>
     				 <Button  variant="primary" type="submit">
      				  	Explore !
      				</Button>
   			 </Form>
			 <Card style={{width:'50%' , margin:'auto' , marginTop:'5vh' }}>
        		<Card.Img variant="top" style={{ height:"400px" , margin:'auto'}} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=15`} />
        			<Card.Body>
          				<Card.Text>
			<li>City Name : {this.state.display_name }</li>
			<li>City latitude: {this.state.latitude  }</li>
			<li>City longitude: {this.state.longitude}</li>
					</Card.Text>
        			</Card.Body>
      			</Card>

   	 	</div>
		)
	}
}

export default App;
