import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Layout() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">CheckList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">ホーム</Nav.Link>
                        <NavDropdown title="チェックリスト" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">一覧</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/checklist/register">登録</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="プリセット" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/presets">一覧</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/preset/register">登録</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item>v1.0.0</Nav.Item>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}

export default Layout;