import React from 'react' ;
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' ;
import GridExample from './GridExample';
import TrackingId from './TrackingId' ;
function App() {
  return (
      <Router>
        <Routes>
          <Route path = "/" exact element = {<GridExample />} /> 
          <Route path = "/trackingId/:id" exact element = {<TrackingId />} /> 
        </Routes>
      </Router>
  );
}

export default App;
