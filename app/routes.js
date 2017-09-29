import React from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom'
import {Popular,Book, Industry  , Nav} from './components';

export default class App extends React.Component {
  render() {
    return (
    	 <BrowserRouter>
		    <div className='container'>
          <Nav />
		    	<Switch>
                <Route exact path='/' component={Book} />
                <Route exact path='/Book' component={Book} />
                <Route exact path='/Industry' component={Industry} />
		    	</Switch>
		    </div>
		 </BrowserRouter>
    )
  }
}