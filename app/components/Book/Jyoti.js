import React from 'react'
import axios from 'axios'

export class Jyoti extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      jyoti_data : null,
    }
  }

  componentDidMount(){
    let self = this;
    axios.get("http://localhost:5000/industry/Jyoti")
    .then(function (response) {
        self.setState({
         jyoti_data:response.data.status
        })
      })
      .catch(function (error) {
      console.log(error);
      });
  }
  render(){
    if(this.state.jyoti_data === null){return <h2> Wait </h2>}
      else{
    return(
      <div>
        <table className="table table-inverse">
        <thead>
          <tr>
            <th>Name</th>
            <th>gadi_no</th>
            <th>rate</th>
            <th>weight</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        {this.state.jyoti_data.map((elem,index) => {
          return (
              <tr key={index}>
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
      </div>

    )
  }
  }
}