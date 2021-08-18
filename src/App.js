
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Create from './create';
import Read from './read';
import Update from './update';

function App() {
  return (
    <Router>       
        <Route  path='/index.html' exact={true} component={Create} />     
        <Route exact path='/index.html/read' component={Read} />   
        <Route exact path='/index.html/update' component={Update} />      
    </Router>
  );
}

export default App;
