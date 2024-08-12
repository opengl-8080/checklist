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
                    <Navbar.Brand href="/">CheckList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">ホーム</Nav.Link>
                        <NavDropdown title="チェックリスト" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">一覧</NavDropdown.Item>
                            <NavDropdown.Item href="/checklist/register">登録</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="プリセット" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/presets">一覧</NavDropdown.Item>
                            <NavDropdown.Item href="/preset/register">登録</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}

export default Layout;