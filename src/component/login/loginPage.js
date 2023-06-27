import { Tab, Tabs, TabList, TabPanel, Container } from "react-bootstrap";
import Login from "./login";
import Signup from "./signup";
export default function LoginPage() {
  return (
    <Container>
      <div>
        <Tabs defaultActiveKey="login" id="login-tabs" className="justify-content-center mb-3">
          <Tab eventKey="login" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="signup" title="Signup">
            <Signup />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}
