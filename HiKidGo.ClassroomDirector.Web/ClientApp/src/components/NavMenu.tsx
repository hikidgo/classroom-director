import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AuthenticationService } from '../services/authentication/authentication.service';
const _authenticationService: AuthenticationService = new AuthenticationService();

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {


    public state = {
        isOpen: false
    };

    handleSignIn() {
        _authenticationService.signIn().then(() => {
            // if (this.props.account) {
            //     this.props.updateAccount(this.props.account);
            // } else {
            //     if (this.props.error) {
            //         this.props.updateError(this.props.error);
            //     } else {
            //         this.props.updateError({ errorMessage: 'Sign-in failed. Please try again.' });
            //     }
            // }
        });
    }

    handleSignOut() {
        // this._authenticationService.signOut().then(() => {
        //     if (!this.props.account) {
        //         this.props.updateAccount(null);
        //     } else {
        //         if (this.props.error) {
        //             this.props.updateError(this.props.error);
        //         } else {
        //             this.props.updateError({ errorMessage: 'Sign-out failed. Please try again.' });
        //         }
        //     }
        // });
    }

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Grimco.X360Plus.Web</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button variant="outline-info" onClick={this.handleSignIn}>Login</Button>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
