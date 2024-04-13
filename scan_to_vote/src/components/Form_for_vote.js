import React, { useState, useEffect } from "react";
import "./vote.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function FormForVote() {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the list of teams from your server
    axios
      .get("http://localhost:3001/getTeams")
      .then((response) => setTeams(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  const validateRollNumber = (rollNumber) => {
    // Regular expression to match the specified pattern
    const pattern = /^(20|21|22)(p3|a9|mh|P3|A9|MH|mH|Mh)(1a|5a|1A|5A)\d{4}$/;
    return pattern.test(rollNumber);
  };

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateRollNumber(rollNumber)) {
      setError('Invalid roll number. Please check the format.');
      return;
    }

    if (!selectedTeam) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    const data = {
      rollNumber,
      selectedTeam,
      ipAddress,
    };

    axios
      .post("http://localhost:3001/check", {ipAddress})
      .then((result) => {
        if (result.data === "Record Exists") {
          console.log("Already Exists Data")
          navigate('/failure');
        }else {
          axios
          .post("http://localhost:3001/getdata", data)
          .then((result) => {
            console.log(result.data);
            navigate('/success');
          })
          .catch((err) => {
            console.error(err);
            navigate('/failure');
          });
        }
      
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title" style={{ color: 'white' }}>Vote for Your Favorite Team</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label className="label" htmlFor="rollNumber" style={{ color: 'white' }}>
            Roll Number:
          </label>
          <input
            className="input"
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="teamSelection" style={{ color: "white" }}>
            Select the Team to Vote:
          </label>
          <select
            className="select"
            id="teamSelection"
            name="teamSelection"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Choose your team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button><br />
        <Link to="/" style={{textDecoration:'none', color:'white'}}>
        Home
        </Link>

      </form>
    </div>
  );
}

export default FormForVote;
	