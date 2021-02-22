import React from 'react'
import {Button , Card} from 'react-bootstrap'

function VideoComponent(props){

	return(
		<Card style={{ width: '23rem', minHeight:'440px', margin:"auto" }}>
		  	<Card.Img variant="top" src={props.thumbnail} />
		  	<Card.Body>
		    	<Card.Title>{props.videoTitle}</Card.Title>
		    	<Card.Subtitle>
		    		{props.channelTitle}
		    	</Card.Subtitle>
		    	<Card.Text>
		    		{props.videoDescription}
		    	</Card.Text>
		  	</Card.Body>
		</Card>
	)
}

export default VideoComponent