const { NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function AppHeader() {

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/contact">Contacts</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
            <h1>Contacts App</h1>
        </header>
    );
}