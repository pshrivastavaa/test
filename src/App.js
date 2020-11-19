import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import InputForm from './component/InputForm'
import CountryDetail from './component/CountryDetail'

function App() {
  return (
    <div className='mt-5 container'>
      <Router>
        <Route path='/' exact component={InputForm} />
        <Route path='/detail' exact component={CountryDetail} />
      </Router>
    </div>

  );
}

export default App;
