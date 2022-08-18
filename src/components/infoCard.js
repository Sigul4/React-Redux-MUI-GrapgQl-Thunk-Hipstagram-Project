import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Box , CardActions } from '@mui/material';
import ListOfMessages from './ListOfMessages.js'

export default function infoCard() {
    return (
        <Card style={{position:"sticky", top:'100px'}} sx={{ maxHeight:'500px', maxWidth: 345, }}>
            <Box>
                <CardMedia
                component="img"
                height="140"
                image="https://cambridge.ua/wp-content/uploads/2021/02/Izuchenie-anglijskogo-po-serialu-Friends-za-i-protiv.jpg"
                alt="green iguana"
                />
                
                <CardContent>
                    <ListOfMessages/>
                </CardContent>
            </Box>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
            </CardActions>
        </Card>
    );
}
