import { Box }          from '@mui/material';
import Card             from '@mui/material/Card';
import CardContent      from '@mui/material/CardContent';
import CardMedia        from '@mui/material/CardMedia';
import * as React       from 'react';
import ListOfMessages   from './ListOfMessages.js';

export default function infoCard({user}) {
    return (
        <Card style={{position:"sticky", top:'100px'}} sx={{ height:'500px', maxWidth: 345, }}>
            <Box>
                <CardMedia
                component="img"
                height="140"
                image="https://cambridge.ua/wp-content/uploads/2021/02/Izuchenie-anglijskogo-po-serialu-Friends-za-i-protiv.jpg"
                />
                
                <CardContent>
                    <ListOfMessages listOfFollows={user?.following}/>
                </CardContent>
            </Box>
        </Card>
    );
}
