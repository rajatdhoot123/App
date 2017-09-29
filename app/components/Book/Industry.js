import React from 'react'
import axios from 'axios'
import { Modal ,Button} from 'react-bootstrap'
import { NavLink } from  'react-router-dom'


  function SelectIndustry(props) {

    var options = ['Jyoti','Ajmani','Ajit','Hanuman'];
    return (
      <div>
        <ul className='languages'>
          {options.map(function (option) {
            return (
              <li
                key={option}
                style={option === props.selectedOption ? {color: '#d0021b'} : null} 
                onClick={props.onSelect.bind(null, option)} key={option} to={`/${option}`}>{option}
              </li>
            )
          }, this)}
        </ul>
      </div>
    )
  }

export default class Industry extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data : null,
      selectedCheckbox : {},
      selectedData : {},
      total : [],
      industry:"Jyoti",

    }

    this.PrintDiv = this.PrintDiv.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  PrintDiv() {
            var divContents = document.getElementsByClassName("tableData")[0].innerHTML;
            console.log(divContents)
            var printWindow = window.open('', '', 'height=200,width=400');
            printWindow.document.write(`<html><head><title>DIV Contents</title>`);
            //printWindow.document.write(`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css" />`);
            printWindow.document.write('</head><body >');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }

  handleCheckboxChange(event){
      const target = event.target;
      let name = target.name;
      let value = {};
      value[name] = JSON.parse(`{${target.value}}`);
      let selectedPrevCheckbox = this.state.selectedCheckbox;
      let x = {};
      if(selectedPrevCheckbox[name]) {
      x[name] = false
      delete this.state.selectedData[name]; 
      delete value[name]; 
       this.setState({
          selectedCheckbox : {...selectedPrevCheckbox,...x},
          selectedData : {...this.state.selectedData,...value},
        });
      }
      else{
      x[name] = true;
      this.setState({
          selectedCheckbox : {...selectedPrevCheckbox,...x},
          selectedData : {...this.state.selectedData,...value},
        });
      }
  }


  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    console.log(this.state.selectedCheckbox,"CheckBox")
  }

  updateOption(abc){
    this.setState({industry: abc}, function () {
      this.handleIndustry(this.state.industry);
    });
  }

    componentDidMount(){
    this.updateOption(this.state.industry);
  }

  handleIndustry(industry) {
    let self = this;
    axios.get(`http://localhost:5000/industry/${industry}`)
    .then(function (response) {
      let selectedPrevCheckbox = self.state.selectedCheckbox;
      let a = {};
      let b = {};
      Object.keys(response.data.status).map((keys) => {
        a[keys] = false;
        b = {...a,...b}
      })
        self.setState({
         data:response.data.status,
         selectedCheckbox : b,
        })
      })
      .catch(function (error) {
      console.log(error);
      });
  }

  render(){
    return(
      <div>
        <SelectIndustry selectedOption={this.state.industry} onSelect={this.updateOption}/>
        {!this.state.data
          ? <p>LOADING!</p>
          :
        <div className="tableData">
          <table className="table table-inverse">
          <thead>
            <tr>
              <th>Select </th>
              <th>Name</th>
              <th>gadi_no</th>
              <th>rate</th>
              <th>weight</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((elem,index) => {
            return (
                <tr key={index} name={index}>
                  <th>
                    <input
                      name={index}
                      type="checkbox"
                      value={`"name" : "${elem.FirstName}","gadi_no" :" ${elem.gadi_no}","weight" : "${elem.weight}","rate" : "${elem.rate}"`}
                      checked={this.state.isSelected}
                      onChange={this.handleCheckboxChange} />
                  </th>
                  <th>{elem.FirstName}</th>
                  <td>{elem.gadi_no}</td>
                  <td>{elem.weight}</td>
                  <td>{elem.rate}</td>
                  <td>{Math.round(elem.rate * elem.weight)}</td>
                </tr>
            )
          })}
          </tbody>
        </table>
        <div className="pay-modal">
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Amount To Receive</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <div>
                <div className="tableData">
                  <table className="table table-inverse">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>gadi_no</th>
                        <th>rate</th>
                        <th>weight</th>
                        <th>Amount Get</th>
                      </tr>
                    </thead>
                  <tbody>
                 {
                    Object.keys(this.state.selectedData).map((temp,index) => {
                    return(
                  <tr key={index}>
                    <th>{this.state.selectedData[temp].name}</th>
                    <td>{this.state.selectedData[temp].gadi_no}</td>
                    <td>{this.state.selectedData[temp].weight}</td>
                    <td>{this.state.selectedData[temp].rate}</td>
                    <td>{Math.round((this.state.selectedData[temp].rate * this.state.selectedData[temp].weight) - 100 - this.state.selectedData[temp].weight)}</td>
                  </tr>
                    )
                  },this)}
                  </tbody>
                </table>
                </div>
             </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
              <Button onClick={this.PrintDiv}>Print</Button>
            </Modal.Footer>
          </Modal>
        </div>
        </div>
      }
          <button type="button" className="btn btn-primary btn-block" onClick={this.PrintDiv}>Print</button>
          <button type="button" className="btn btn-primary btn-block" onClick={this.open}>Calculate</button>
      </div>
    )
  }
}