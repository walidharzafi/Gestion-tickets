import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from './contextApi/MyContext'
import Routes from './routes/Router'
import './components/Admin/Sidebar.css'
import './App.css'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes />
      </Router>
    </UserProvider>
  );
}

export default App;
