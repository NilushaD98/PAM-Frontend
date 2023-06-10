import React,{useEffect,useState} from 'react'
import '../style/home.css'
import '../media/female-athlete.jpg'
import LiveCardAdmin from '../compo/LiveCardAdmin'

export default function HomePage() {

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
    <div className='home_main_Container'>
        <div className="top_poster_cont" id='home'>
            
            <div className="image_layer"></div>
            <div className="gradient_layer"></div>

            <div className="detail_title_layer">
                <p>Play hard, win big</p>
                <h4>Unleashing human potential</h4>
                <h6>elit. Sed viverra justo et sapien posuere ultrices. Praesent tristique tincidunt orci, in suscipit nunc commodo vitae. Donec ut orci vel nunc scelerisque iaculis. In at massa vel sapien fringilla laoreet. Duis lacinia sapien vitae purus blandit, ac pulvinar dui bibendum. Nullam ac hendrerit orci, id interdum nulla. Sed luctus, nisi eu faucibus sollicitudin, leo elit auctor tellus, eu laoreet tellus mauris non augue. Aenean a vestibulum sapien, nec blandit est. Duis semper mi eu lectus pulvinar, ac imperdiet turpis accumsan. Suspendisse potenti. Sed blandit malesuada lacinia. Sed non quam et risus sollicitudin suscipit eget quis velit. Sed pellentesque elit eu libero dapibus euismod. Quisque sed velit in dolor viverra laoreet eu et risus</h6>

                {/* <div className="buttoun_area">
                    <button>Explore</button>
                </div> */}
            </div>
        </div>

        <div className="second_poster_layer">
            <div className="title_container">
                <p>Upcoming events</p>
            </div>
            <div className="item_row_container">
            {data.map(item => (<LiveCardAdmin 
                LinkVideo = {item.videoLink}
                title={item.title}
                description={item.description}
                filePath = {item.filePath}
                id={item.id}
            />))}
               
            </div>
        </div>

        <div className="Third_poster_layer" sx={{marginTop: "100px"}} id='live'>
            <div className="title_container">
                <p>Broadcast events</p>
            </div>
            <div className="item_row_container">
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
