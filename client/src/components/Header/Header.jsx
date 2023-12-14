import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "../SignupForm/SignupForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

import Auth from "../utils/auth.js";

import pokeDex from "../../assets/pokeDex.png";

import "./Header.css";

function Header() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const currentPage = useLocation().pathname;

  return (
    <>
      <nav className="d-flex pt-3">
        <img className="ps-5" src={pokeDex} alt="A pokedex outline!" />

        <section id="" className="d-flex flex-column">
          <section id="name" className="d-flex align-items-center ps-3">
            <h1 id="title">Pokemon Team Builder</h1>
          </section>

          <section id="links" className="d-flex align-items-center ps-3">
            <Link to="/" className="nav-link d-flex align-items-center px-3">
              <span className={currentPage === "/" ? "icon" : ""}></span>home
            </Link>

            <Link
              to="/me"
              className="nav-link d-flex align-items-center px-3"
            >
              <span className={currentPage === "/me" ? "icon" : ""}></span>
              my teams
            </Link>

            <Link
              to="/create-team"
              className="nav-link d-flex align-items-center px-3"
            >
              <span className={currentPage === "/create-team" ? "icon" : ""}></span>
              +new team
            </Link>

            {/* if user is logged in show logout button */}
            {Auth.loggedIn() ? (
              <a className="nav-link px-3" onClick={Auth.logout}>
                logout
              </a>
            ) : (
              <a className="nav-link px-3" onClick={() => setShowModal(true)}>
                login/signup
              </a>
            )}
          </section>
        </section>
      </nav>
      {/* set modal data up for logging in */}
      <Modal
      className='modal-style'
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
}

export default Header;
