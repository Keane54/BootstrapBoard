import { Container } from "react-bootstrap";
import { EthAndGasPrice } from "./components/ethAndGasPrice/EthAndGasPrice";


function App() {
  return (
    <div className="App">
      <Container fluid className="bg-dark pb-1 mb-5 d-flex justify-content-center align-content-center">
        <h1 className="text-white mb-0">BootstrapBoard</h1>
      </Container>

      <EthAndGasPrice/>
      
    </div>
  );
}

export default App;
