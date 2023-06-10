import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function CardRelated(props) {
  return (
    <div>
    <Card sx={{ maxWidth: 380,paddingRight:'20px' }}>
      <CardActionArea sx={{display: 'flex',gap: '10px'}}>
        <CardMedia
           component="a"
           height="100%"
           width ="100"
           href={props.LinkOfVideo}
           rel="noopener noreferrer"
           target="_blank"
           sx={{display: 'flex',alignItems: 'center',justifyContent: 'center', flexDirection: 'column'}}
        >
          <video
        src={props.LinkOfVideo}
        controls
        width="200"
        height="200"
      />
        </CardMedia>
        <CardContent sx={{width: 200, display: 'flex',gap: '8px',flexDirection: 'column',}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{color:'#aaaaaaee'}}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}
