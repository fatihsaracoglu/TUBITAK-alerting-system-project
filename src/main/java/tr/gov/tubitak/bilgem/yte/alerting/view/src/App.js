import React from 'react';
import './assets/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AlertForm from './components/AlertForm';
import AlertUpdateForm from './components/AlertUpdateForm';
import AlertList from './components/AlertList';
import AlertDetail from './components/AlertDetail';
import NotFoundPage from './components/NotFoundPage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={AlertForm}/>
            <Route exact={true} path="/alerts" component={AlertList}/>
            <Route exact={true} path="/alerts/update/:id" component={AlertUpdateForm}/>
            <Route exact={true} path="/alerts/:id" component={AlertDetail}/>
            <Route path="" component={NotFoundPage}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
  );
}

export default App;
