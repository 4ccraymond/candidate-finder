import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getRandomCandidate = async () => {
    setLoading(true);
    try {
      const userList = await searchGithub();
      if (userList.length === 0) {
        setCandidate(null);
        return;
      }

      // Pick a random user from the fetched list
      const randomUser = userList[Math.floor(Math.random() * userList.length)];

      // Fetch full details for that user
      const fullCandidate = await searchGithubUser(randomUser.login);
      setCandidate(fullCandidate);
    } catch (err) {
      console.error("Error fetching candidate:", err);
      setCandidate(null);
    }
    setLoading(false);
  };

  const handleAccept = () => {
    if (!candidate) return;
  
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const updated = [...saved, candidate];
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
  
    getRandomCandidate();
  };

  useEffect(() => {
    getRandomCandidate();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading candidate...</p>
      ) : candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.name} width="100" />
          <h2>{candidate.name} (@{candidate.login})</h2>
          <p>Location: {candidate.location || "Unknown"}</p>
          <p>Email: {candidate.email || "Unavailable"}</p>
          <p>Company: {candidate.company || "Unavailable"}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <div>
            <button className="accept-btn" onClick={handleAccept}>+</button>
            <button className="reject-btn" onClick={getRandomCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No candidate found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;