import React from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom'
import {Popular,Book, Jyoti} from './components';

export default class App extends React.Component {
  render() {
    return (
    	 <BrowserRouter>
		    <div className='container'>
          <Popular />
		    	<Switch>
                <Route exact path='/' component={Book} />
                <Route exact path='/Book' component={Book} />
            		<Route exact path='/Jyoti' component={Jyoti} />
		    	</Switch>
		    </div>
		 </BrowserRouter>
    )
  }
}