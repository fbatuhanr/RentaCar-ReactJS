import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function App() {
  return (
      <div>
        <h1>
          Example heading
          <Badge bg="secondary" as={Button}>
            New
          </Badge>
        </h1>
      </div>
  );
}

export default App;
