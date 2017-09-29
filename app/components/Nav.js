var React = require('react');
var NavLink = require('react-router-dom').NavLink;

export function Nav () {
  return (
    <ul className='nav' style={{display: "inline-flex"}}>
      <li>
        <NavLink exact activeClassName='active' to='/Book'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Industry'>Industry</NavLink>
      </li>
    </ul>
  )
}
