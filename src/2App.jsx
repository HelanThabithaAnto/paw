import { NavLink } from 'react-router-dom';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="App">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" activeClassName="Login">Login</NavLink>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
