import { Row, Col, Container } from "react-bootstrap";
import { GasPrice } from "./components/gasPrice/GasPrice";
import { EthPrice } from "./components/ethPrice/EthPrice";
import { CurrentBlock } from "./components/currentBlock/CurrentBlock";
import { GetEthBalance } from "./components/getETHBalance/GetETHBalance";


function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row className="bg-dark pb-1 mb-5 d-flex justify-content-center align-items-center">
          <Col sm={{span: 6, offset: 3}}>
            <h1 className="text-white mb-0">Bootstrap Dashboard</h1>
          </Col>

          <Col sm={{span: 1, offset: 2}}>
            <EthPrice />
          </Col>
        </Row>
      </Container>

      <GasPrice/>

      <Container fluid className="m-0">
        <Row>
          <Col md={{span: 5}}>
            <CurrentBlock />
          </Col>
          <Col sm={12} md={{span: 5, offset:2}}>
            <GetEthBalance />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
