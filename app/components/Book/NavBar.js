import React from 'react'
import {NavLink} from 'react-router-dom'

export class Popular extends React.Component {
  constructor(props) {
   super(props);
    this.state = {
      selectedOption: 'Home',
    };

    this.updateOption = this.updateOption.bind(this);
  }
  updateOption(option) {
    this.setState(function () {
      return {
        selectedOption : option,
      }
    });
  }
  render() {

    var options = ['Book','Jyoti', 'Ajit', 'Ajmani', 'Hamuman'];

    return (
      <div>
        <ul className='languages'>
          {options.map(function (option) {
            return (
              <li
                key={option}>
                <NavLink
                style={option === this.state.selectedOption ? {color: '#d0021b'} : null}
                onClick={this.updateOption.bind(null, option)} 
                style={option === this.state.selectedOption ? {color: '#d0021b'} : null}
                activeClassName='active' to={`/${option}`}>{option}</NavLink>
              </li>
            )
          }, this)}
        </ul>
      </div>
    )
  }
}