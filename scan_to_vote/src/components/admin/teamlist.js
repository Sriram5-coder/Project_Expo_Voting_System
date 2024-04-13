// Teamlist.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./teamlist.css";
import { Link, useNavigate } from "react-router-dom";

function Teamlist() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the list of teams from your server
    axios
      .get("https://inquisitive-duck-jodhpurs.cyclic.app/getTeams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteTeam = (teamName) => {
    // Make an axios call to your server to delete the team by name
    axios
      .delete(`https://inquisitive-duck-jodhpurs.cyclic.app/teams/${teamName}`)
      .then((response) => {
        // Reload the page to update the table with the latest data
        window.location.reload();
      })
      .catch((error) => {
        // Handle the error
      });
  };

  return (
    <div className="table-container">
      <br />
      <br />
      <div className="elements">
        <h2>List of Teams</h2>
        <Link to="/admin">
          <p>Back</p>
        </Link>
        <Link to="/">
          <p>Logout</p>
        </Link>
      </div>

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team}</td>
              <td>
                <button onClick={() => handleDeleteTeam(team)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teamlist;
