import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Icards(props) {
  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardActionArea sx={{height: 'fit-content'}}>
        <CardMedia
           component="a"
           height="140"
           href={props.LinkOfVideo}
           rel="noopener noreferrer"
           target="_blank"
          
        >
          <video
        src={props.LinkOfVideo}
        controls
        width="100%"
        height="200"
      />
        </CardMedia>
        {/* <img src={props.imagepath} alt='item-image' height= '150'/> */}
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{marginTop: "10px"}}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginTop: "15px"}}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}