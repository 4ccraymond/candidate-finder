import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Candidate Search</Link>
      <Link to="/saved">Saved Candidates</Link>
    </nav>
  );
};

export default Nav;
