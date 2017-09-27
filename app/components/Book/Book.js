import React from 'react'
import Formsy from 'formsy-react';
import classnames from 'classnames'
import moment from 'moment'
import Time from 'react-time'
import { DropdownButton , MenuItem, Button } from 'react-bootstrap'
import { Popular } from './NavBar'
import axios from 'axios'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const getOptions = (input) => {
  return axios.get(`http://localhost:5000/getallcustomers`)
    .then((response) => {
    	let json = []
    	response.data.status.map((elem) => {
    		let obj = {}
    		obj['label'] = elem.FirstName,
    		obj['value'] = elem,
    		json.push(obj)
    	})
      return json;
    }).then((json) => {
      return { options: json };
    });
}

export default class Book extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			name : "",
			vehicle:"",
			rate:"",
			weight:"",
			ohe:"",
			commision:"",
			aggrement:"",
			others:"",
			total_expense:0,
			activeGenes:"Cotton",
			industry:{name:"Jyoti",id:"1"},
			mob:"",
			village:"",
			customerName:"",
		}

		this.handleName = this.handleName.bind(this);
		this.handleVehicle = this.handleVehicle.bind(this);
		this.handleGenes = this.handleGenes.bind(this);
		this.handleRate = this.handleRate.bind(this);
		this.handleWeight = this.handleWeight.bind(this);
		this.handleOhe = this.handleOhe.bind(this);
		this.handleCommision = this.handleCommision.bind(this);
		this.handleAggrement = this.handleAggrement.bind(this);
		this.handleOthers = this.handleOthers.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMobNo = this.handleMobNo.bind(this);
		this.handleIndustryName = this.handleIndustryName.bind(this);
		this.handleVillage = this.handleVillage.bind(this);
		this.hadleCustomerSelect = this.hadleCustomerSelect.bind(this);
	}

	handleSubmit(){
		let self = this;
		axios.post("http://localhost:5000/submit",this.state)
		.then(function (response) {
    	if(response.data.code === 200){
    		self.setState({
				name : "",
				vehicle:"",
				rate:"",
				weight:"",
				ohe:"",
				commision:"",
				aggrement:"",
				others:"",
				total_expense:0,
				activeGenes:"Cotton",
				industry:{name:"Jyoti",id:"1"},
				mob:"",
				village:"",
			})
			alert("SuccessFully Inserted")
    	}
    	else if(response.data.code === 400){
    		alert("Mob No is Already Registered")	
    	}
  		})
  		.catch(function (error) {
    	console.log(error);
  		});
	}

	handleVillage(e){
		this.setState({
		village: e.target.value,
	})
	}

	handleMobNo(e){
		this.setState({
			mob: e.target.value
		})
	}

	handleIndustryName(e){
		this.setState({
			industry:e
		})
	}
	handleName(e){
		this.setState({
			name: e.target.value
		})
	}

	hadleCustomerSelect(e){
		this.setState({
			customerName:e,
			village:e.value.village,
			mob:e.value.mobile_no,
			name:e.label,
		})
	}

	handleCommision(e){
		let com = parseFloat(e.target.value);
		(!com) ?
		this.setState((prevState) => ({
  			commision:"",
  			total_expense: this.state.total_expense - prevState.commision,
		})) : 
		this.setState((prevState) => ({
  			commision:com,
  			total_expense: prevState.total_expense + com - prevState.commision,
		}))
	}

	handleAggrement(e){
		let agree = parseFloat(e.target.value);
		(!agree) ?
		this.setState((prevState) => ({
  			aggrement:"",
  			total_expense: prevState.total_expense - prevState.aggrement,
		})) : 
		this.setState((prevState) => ({
  			aggrement:agree,
  			total_expense: prevState.total_expense + agree - prevState.aggrement,
		}))
	}

	handleOthers(e){
		let other = parseFloat(e.target.value);
		(!other) ?
		this.setState((prevState) => ({
  			others:"",
  			total_expense: prevState.total_expense - prevState.others,
		})) :
		this.setState((prevState) => ({
  			others:other,
  			total_expense: prevState.total_expense + other - prevState.others,
		}))
	}

	handleOhe(e){
		let ohee = parseFloat(e.target.value);
		(!ohee) ?
		this.setState((prevState) => ({
  			ohe:"",
  			total_expense: prevState.total_expense - prevState.ohe,
		})) : 
		this.setState((prevState) => ({
  			ohe:ohee,
  			total_expense: prevState.total_expense + ohee - prevState.ohe,
		}))
	}	

	handleName(e){
		this.setState({
			name: e.target.value
		})
	}

	handleWeight(e){
		let wt = e.target.value;
		(!wt) ? 
		this.setState({
			weight:""
		}) 
		: 
		this.setState({
			weight:parseFloat(e.target.value)
		})
	}

	handleRate(e){
		let rt = e.target.value;
		(!rt) ? 
		this.setState({
			rate: ""
		})
		:
		this.setState({
			rate: parseFloat(e.target.value)
		})
	}

	handleVehicle(e){
		this.setState({
			vehicle: e.target.value
		})
	}

	handleGenes(e){
		this.setState({
			activeGenes:e
		})
	}
	render(){
		const industry_name = {1:"Jyoti",2:"Hanuman",3:"Ajit",4:"Ajmani",5:"Vimal"}
		let now = new Date();
		return (
			<div>
			<div className="container">
  				<div className="panel panel-default">
    				<div className="panel-heading text-center">Shree Ganesh</div>
  						<br />
		    			<div className="panel-body">
		    				<div>
		    				<div className="well">	
			    				<div className="row">
									<div className="col-md-8 col-sm-8">
										<Select.Async
										  name="customer_name"
										  value={this.state.customerName}
										  loadOptions={getOptions}
										  autosize={true}
										  placeholder="Enter customer name"
										  onChange={this.hadleCustomerSelect}
										/>
				  						<input type="text" className="form-control" placeholder="Customer Name" aria-describedby="basic-addon1" onChange={this.handleName} value={this.state.name}/>
				  					</div>
						  			<div className="col-md-4 col-sm-4">
						  				<input type="text" className="form-control" placeholder="Vehicle No" aria-describedby="basic-addon1" onChange={this.handleVehicle} value={this.state.vehicle}/>
						  			</div>
			    				</div>
			    				<br />
			    				<div className="row">
			    					<div className="col-md-4 col-sm-4">
						  				<input type="text" className="form-control" placeholder="Village" aria-describedby="basic-addon1" onChange={this.handleVillage} value={this.state.village}/>
						  			</div>
									<div className="col-md-4 col-sm-4">
				  						<DropdownButton className="btn btn-secondary dropdown-toggle" title={this.state.industry.name} id="bg-vertical-dropdown-1" onSelect={this.handleIndustryName} aria-haspopup="true" aria-expanded="false">
					      				{
					      					Object.keys(industry_name).map((keys) => {
					      					return 	<MenuItem key={keys} className={this.state.industry.name === `${industry_name[keys]}` ? "active" : ""} eventKey={{name:`${industry_name[keys]}`,id:`${keys}`}}>{`${industry_name[keys]}`}</MenuItem>
					      					})
					      				}
					    			</DropdownButton>
				  					</div>
						  			<div className="col-md-4 col-sm-4">
						  				<input type="number" className="form-control" placeholder="Mobile No" aria-describedby="basic-addon1" onChange={this.handleMobNo} value={this.state.mob}/>
						  			</div>
			    				</div>
			    			</div>
		  					</div>
		  					<br />
		  					<div>
			  				<div className="row">
								<div className="col-sm-6 col-md-6">
									<input type="text" className="form-control" name="tulai" value={Math.ceil(this.state.weight * 3)} placeholder="Tulai" aria-describedby="basic-addon1" readOnly/>
								</div>
								<div className="col-sm-2 col-md-2">
									<DropdownButton className="block" title={this.state.activeGenes} id="bg-vertical-dropdown-1" onSelect={this.handleGenes}>

					      				<MenuItem className={this.state.activeGenes === "Cotton" ? "active" : ""} eventKey="Cotton" value="">Cotton</MenuItem>
					      				<MenuItem className={this.state.activeGenes === "Soyabean" ? "active" : ""} eventKey="Soyabean" value="Soyabean">Soyabean</MenuItem>
					      				<MenuItem className={this.state.activeGenes === "Wheat" ? "active" : ""} eventKey="Wheat" value="Wheat">Wheat</MenuItem>
					      				<MenuItem className={this.state.activeGenes === "others" ? "active" : ""} eventKey="others" value="others">others</MenuItem>
					    			</DropdownButton>
								</div>
								<div className="col-sm-2 col-md-2">
									<input type="number" className="form-control" placeholder="Rate" value={this.state.rate} onChange={this.handleRate} aria-describedby="basic-addon1"/>
								</div>
								<div className="col-sm-2 col-md-2">
									<input type="number" className="form-control" placeholder="Weight" value={this.state.weight} onChange={this.handleWeight} aria-describedby="basic-addon1"/>
								</div>
							</div>
		  					</div>
							<br />
							<div className="row">
								<div className="col-md-6 col-sm-6">
									<div className="well">
										<label htmlFor="total_amount">Gross Amount</label>
										<input type="text" className="form-control" name="total_amount" placeholder="GrossAmount" value={(this.state.weight * this.state.rate ).toLocaleString('en-IN')} aria-describedby="basic-addon1" readOnly/>
										<label htmlFor="total_amount">Tulai</label>
										<input type="text" className="form-control" name="tulai" placeholder="Tulai" value={Math.ceil(this.state.weight * 3)} aria-describedby="basic-addon1" readOnly/>
										<label htmlFor="tulai">Total Expense</label>
										<input type="number" className="form-control" name="total_expense" value={ this.state.total_expense } placeholder="Total Expense" aria-describedby="basic-addon1" readOnly/>
									</div>
									<label htmlFor="total">Amount to Paid</label>
									<input type="text" className="form-control" name="total" value={((this.state.rate * this.state.weight) - this.state.total_expense - Math.ceil(this.state.weight * 3)).toLocaleString('en-IN')} placeholder="Amout to Paid" aria-describedby="basic-addon1" readOnly/>
									</div>	
								<div className="col-md-6 col-sm-6">
									<div className="well">
										<label htmlFor="example-number-input" className="col-form-label">Over Head Expense</label>
				    					<input className="form-control" type="number" value={this.state.ohe} onChange={this.handleOhe} id="example-number-input" placeholder="Over Head Expense"/>
										<br />
										<label htmlFor="commision">Commision</label>
										<input type="number" pattern="[0-9]*" className="form-control" name="commision" value={`${this.state.commision}`} onChange={this.handleCommision} placeholder="Commision" aria-describedby="basic-addon1"/>
										<br />
										<label htmlFor="aggrement">Aggrement</label>
										<input type="number" pattern="[0-9]*" className="form-control" name="aggrement" value={`${this.state.aggrement}`} onChange={this.handleAggrement} placeholder="Aggrement" aria-describedby="basic-addon1"/>
										<br />
										<label htmlFor="others">Others</label>
										<input type="number" pattern="[0-9]*" className="form-control" name="others" value={this.state.others} onChange={this.handleOthers} placeholder="Others" aria-describedby="basic-addon1"/>
										<br />
									</div>
									<label htmlFor="total">Total</label>
									<input type="number" pattern="[0-9]*" className="form-control" name="total" placeholder="total" 
										value={this.state.total_expense} aria-describedby="basic-addon1" readOnly/>
								</div>
							</div>
				    	</div>
			    		<div className="panel-footer clearfix">
				        	<div className="col-md-6 col-sm-6">
				            	Signature
				        	</div>
				        	<div className="col-md-6 col-sm-6">
       						 	<p>Today is <Time value={now} format="DD/MM/YYYY" /></p>
       						 	<p>Time is <Time value={now} format="HH:mm" /></p>
				        	</div>
			    		</div>
				</div>
				<div className="col-md-12 col-sm-12">
					<Button type="button" block onClick={this.handleSubmit} className="btn btn-primary">Submit</Button>
				</div>
			</div>
			</div>	
		)
	}
}