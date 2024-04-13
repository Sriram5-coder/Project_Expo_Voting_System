import React,{useState} from 'react';
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';

function Team_edit() {
  const navigate = useNavigate()
  const [teamname,setTeamname] = useState("");

  const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post("https://inquisitive-duck-jodhpurs.cyclic.app/teamadd",{teamname})
      .then(result=>{console.log(result)
        navigate('/admin')
      })
      .catch(err=>console.log(err))
    }
  return (
    <>
    
    <div className='form-container'>
    
         <form className='form' onSubmit={handleSubmit}>
          <h2 className='form-title'>Add Team</h2>
            <div className="form-group">
            <label className='label' for="teamname">Team Name:</label>
            <input type="text" className="input" id="teamname" 
            placeholder="Enter Team Name" name="teamname" 
            value={teamname} onChange={(e)=>{setTeamname(e.target.value)}}/>
            </div>
            <br />
            <button type="submit" className="btn btn-primary submit-button">Add</button>
            <br/><br/>
            <Link to="/admin" style={{textDecoration:'none',fontSize:'18px',color:'white'}}>
                Home
            </Link><br/><br/>
            <Link to="/" style={{textDecoration:'none',fontSize:'18px',color:'white'}}>
                Logout
            </Link>
        </form>
    </div>
    </>
  )
}

export default Team_edit;
