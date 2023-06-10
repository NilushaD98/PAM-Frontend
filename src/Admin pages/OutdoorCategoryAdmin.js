import React,{useEffect,useState}from 'react'
import '../style/categoryItem.css'
import LiveCardAdmin from '../compo/LiveCardAdmin'

function OutdoorCategoryAdmin() {
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
    <div className="category_item_main_div">
        <div className="category_first_poster_div">
            <div className="Outdoor_image_layer"></div>
            <div className="category_gradient_layer"></div>
            <div className="Outdoor_details_div">
                <p>Outdoor games, test limits</p>
                <h4>Outdoor activities</h4>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam impedit! 
                    Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquamaliquam impedit! 
                    Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam</h6>
            </div>
        </div>
        <div className="category_second_video_div">
            <div className="Outdoor_video_title">
                <p>Latest Videos</p>
            </div>
            <div className="video_Outdoor_div">
                {data.map(item => (<LiveCardAdmin 
                LinkVideo = {item.videoLink}
                title={item.title}
                description={item.description}
                filePath = {item.filePath}
                id={item.id}
                />))}
            </div>
        </div>
    </div>
  )
}

export default OutdoorCategoryAdmin