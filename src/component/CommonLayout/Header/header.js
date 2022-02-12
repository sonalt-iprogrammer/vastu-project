import { Fragment } from 'react'
import { Navbar, Form, Container, Nav,NavDropdown } from 'react-bootstrap'
import './header.css'
import { CgProfile } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
import { FiBell } from 'react-icons/fi'

import { GiPoliceBadge } from 'react-icons/gi'
import MyCard from '../../UI/card/MyCard'
const Header = () => {
  return (
    <Fragment>
      <Navbar expand="lg" >
        <Container fluid>
          <Navbar.Brand href="/">Utec</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">About</Nav.Link>
              <Nav.Link href="#action2">Learn</Nav.Link>
              <Nav.Link href="#action2">Solution</Nav.Link>
              
             
            </Nav>
            <Form className="d-flex">
              {/* <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              /> */}
              {/* <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    English
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">English</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Marathi</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}

              {/* <li className="nav-item dropdown active">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  English
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/">
                      Hindi
                    </a>
                  </li>
                  {/* <li><a className="dropdown-item" href="/">Marathi</a></li>

            <li><a className="dropdown-item" href="/">English</a></li> */}
                {/* </ul>
              </li>  */}
              <NavDropdown title="English" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">English</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Hindi
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Marathi
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action1">Support</Nav.Link>
              <Nav.Link href="#action1">MyProjects</Nav.Link>
              <FiSearch className="MyIcon" size="25px"></FiSearch>
              <FiBell className="MyIcon" size="25px"></FiBell>
              <CgProfile className="MyIcon" size="25px"></CgProfile>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    </Fragment>
  )
}

export default Header
