import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './result.css';
import { Link } from 'react-router-dom';

function Result() {
  const [teamVoteCounts, setTeamVoteCounts] = useState([]);
  const [winningTeam, setWinningTeam] = useState('');
  const [runnerUpTeam, setRunnerUpTeam] = useState('');

  useEffect(() => {
    // Make a GET request to your Express.js server's API endpoint
    axios.get('http://localhost:3001/team-vote-counts')
      .then((response) => {
        const { teamCounts, winningTeam, runnerUpTeam } = response.data;
        setTeamVoteCounts(teamCounts);
        setWinningTeam(winningTeam);
        setRunnerUpTeam(runnerUpTeam);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='list-container'>
      <div className="elements">
        <h2>Votes Count</h2>
        <Link to="/admin">
          <p style={{ color: 'black', textDecoration: 'none' }}>Back</p>
        </Link>
        <Link to="/">
          <p style={{ color: 'black', textDecoration: 'none' }}>Logout</p>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {teamVoteCounts.map((teamCount) => (
            <tr key={teamCount._id}>
              <td>{teamCount._id}</td>
              <td>{teamCount.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Winning team: {winningTeam}</p>
      <p>Runner-up team: {runnerUpTeam}</p>
    </div>
  );
}

export default Result;
