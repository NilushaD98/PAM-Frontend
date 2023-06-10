import * as React from 'react';
import '../style/region.css'
import CottageIcon from '@mui/icons-material/Cottage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { CardActionArea} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

export default function SimplePaper() {
  return (
   <div className="region_main_container">

    <div className="title_container_region">
        <p>Select Your Region</p>
    </div>

    <div className="region_option_container">
        <Card  sx={{height: '150px', width: '180px',textAlign: "center",background: 'linear-gradient(120deg, #aaa, #fff)'}}>
            <CardActionArea sx={{height: '150px',outlineColor:"transparent"}} href='/local_login'>
                <CardContent>
                    <CottageIcon sx={{color: "#414141",fontSize: 50}}/>
                    <p>Local User</p>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card  sx={{height: '150px', width: '180px',textAlign: "center",background: 'linear-gradient(120deg, #aaa, #fff) '}}>
            <CardActionArea sx={{height: '150px',outlineColor:"transparent"}} href='/international_login'>
                <CardContent>
                    <AirplanemodeActiveIcon sx={{color: "#414141",fontSize: 50}}/>
                    <p>International User</p>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>

   </div>
  );
}