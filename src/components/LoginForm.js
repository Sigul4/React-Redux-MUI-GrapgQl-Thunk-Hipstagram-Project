import {Box, Card } from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import LinkWrap from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Sheet from '@mui/joy/Sheet';
import { useState, useEffect} from 'react';


export default function LoginPage({onLogin}){

    const [login, ChangeLogin] = useState('')
    const [password, ChangePassword] = useState('')

    useEffect(()=>{
        console.log(login,password)
    },[login,password])

    return (
        <Box sx={{width: "100%",display: "flex", justifyContent: "center" }}>
            <Box sx={{maxWidth: 1200}}>
                <Box sx={{display: "flex",flexDirection:"column" ,justifyContent: "center"}}>
                    <Card
                        sx={
                            {
                            maxWidth:"800px",
                            mt:10,
                            p:4,
                            boxShadow: 6
                            }
                        }
                        >
                        <h1>Welcome To Hipstagram!</h1>
                        <Box sx={{display: "flex", flexDirection:"column"}}>
                        <TextField
                            id="outlined-helperText"
                            label="Login"
                            helperText=" "
                            value={login} 
                            onChange={(e) => ChangeLogin(e.target.value)}
                            />
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => ChangePassword(e.target.value)}
                            />
                        </Box>
                        <Button
                            onClick={() => onLogin(login, password)}
                            sx={{
                            mt: 4, // margin top
                            height: 40
                            }}
                            variant="contained"
                        >
                            <h3>Sign in</h3>
                        </Button>
                    </Card>
                    <Card
                        sx={
                            {
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-around",
                            maxWidth:"800px",
                            mt:3,
                            boxShadow: 6,
                            marginBottom: '150px'
                            }
                        }
                        >
                        <h4>Have no account?</h4>
                        <Box sx={{display: "block"}}>
                            <Link  to="/register">
                                <LinkWrap
                                level="h3"
                                underline="none"
                                variant="soft">
                                        Create account
                                </LinkWrap>
                            </Link>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
}

    
