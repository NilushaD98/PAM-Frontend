import React from 'react'
import '../style/category.css'
import { Link} from 'react-router-dom';

function Category() {


  return (
    <div className='category_main_container'>
        <div className="category_Aquatics_container">
            <div className="linier_div_one"></div>
            <div className="aquatics_details_cntainer">
                <h1>Flow with the water</h1>
                <h6>Aquatics activities</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam impedit! 
                    Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam</p>

                    <Link to={"/Aquatics"}>
                        <button>Explore</button>
                    </Link>
            </div>
        </div>

        <div className="category_indoor_container">
            <div className="linier_div_three"></div>
            <div className="indoor_details_cntainer">
                        <h1>Game on, let's play</h1>
                        <h6>Indoor activities</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam impedit! 
                            Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam</p>

                            <Link to={"/IndoorCategory"}>
                                <button>Explore</button>
                            </Link>
            </div>
        </div>
        
        <div className="category_Athletics_container">
            <div className="linier_div_two"></div>
            <div className="athletics_details_cntainer">
                    <h1>Believe in your abilities</h1>
                    <h6>Athletics activities</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                        consectetur exercitationem? Pariatur, aliquam impedit! 
                        Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                        consectetur exercitationem? Pariatur, aliquam</p>

                        <Link to={"/AthleticCategory"}>
                            <button>Explore</button>
                        </Link>
            </div>
        </div>

        

        <div className="category_outdoor_container">
            <div className="linier_div_four"></div>
            <div className="outdoor_details_cntainer">
                        <h1>Outdoor games, test limits</h1>
                        <h6>Outdoor activities</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam impedit! 
                            Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam</p>

                            <Link to={"/OutdoorCategory"}>
                                <button>Explore</button>
                            </Link>
            </div>
        </div>

        <div className="category_beach_container">
            <div className="linier_div_five"></div>
            <div className="beach_details_cntainer">
                        <h1>Sand, sun, and victory</h1>
                        <h6>Beach activities</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam impedit! 
                            Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                            consectetur exercitationem? Pariatur, aliquam</p>

                            <Link to={"/BeachCategory"}>
                                <button>Explore</button>
                            </Link>
            </div>
        </div>
    </div>
  )
}

export default Category