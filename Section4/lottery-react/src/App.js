import './App.css';
// import Dashboard page
import Dashboard from './components/pages/Dashboard'
import Form from './components/pages/Form';
import PickWinner from './components/pages/PickWinner';

function App() {
  return (
    <div>
      <Dashboard/>
      <Form/>
      <PickWinner/>
    </div>
  );
}

export default App;
