import React,{useEffect,useState}from 'react'
import Icards from '../compo/Icards'
import '../style/live.css'

function Live() {

  const [data, setData] = useState([]);   

  const getALlVideos = () =>{
    fetch('http://localhost:8083/api/v1/admins/getAllVideos',
      {
        method :'GET',
        header:{'Accept': 'application/json','Content-Type':'application/json'},
        headers :{
                  'Content-Type': 'application/json'  
                  }
      }
    )
    .then(resp => {
          if(resp.ok){
      resp.json().then(data => {
              setData(data.data);
            }
          );           
        }
      }
    )
    .catch(error => {
      }
  ); 
  }

  useEffect(() => {
    getALlVideos();
}, []);
  return (
    <div className='Live_main_container'>
        <div className="live_title_container">
            <h1>Live streams</h1>
        </div>
        <div className="live_video_container">
        {data.map(item => (<Icards 
            key = {item.id}
            LinkOfVideo={item.videoLink}
            title={item.title}
            description= {item.description}
            />
            ))}
        </div>
    </div>
  )
}

export default Live