import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from './component/auth/auth';
import MyList from './component/song-list/MyList/MyList';
import AddSong from './component/add-song/AddSong';
import EditSong from './component/edit-song/EditSong';
import Home from './component/home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={Auth} />
          <Route path='/my-list' component={MyList} />
          <Route path='/add-song' component={AddSong} />
          <Route path='/edit-song/:id' component={EditSong} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
