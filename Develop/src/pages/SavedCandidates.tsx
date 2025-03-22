import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setCandidates(saved);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        candidates.map((candidate) => (
          <div key={candidate.login} style={{ marginBottom: "20px" }}>
            <img src={candidate.avatar_url} alt={candidate.name} width="80" />
            <h2>{candidate.name} (@{candidate.login})</h2>
            <p>Location: {candidate.location || "Unknown"}</p>
            <p>Email: {candidate.email || "Unavailable"}</p>
            <p>Company: {candidate.company || "Unavailable"}</p>
            <a
              href={candidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
