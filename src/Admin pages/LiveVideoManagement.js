import React ,{useEffect,useState}from 'react'
import '../style/live.css'
import LiveCardAdmin from '../compo/LiveCardAdmin'
import 'firebase/storage';


function LiveVideoManagement() {

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
        console.log(resp);
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
        <div className="admin_live_video_container">
           
        {data.map(item => (<LiveCardAdmin 
        LinkVideo = {item.videoLink}
        title={item.title}
        description={item.description}
        filePath = {item.filePath}
        id={item.id}
        />))}
           
        </div>
    </div>
  )
}

export default LiveVideoManagement