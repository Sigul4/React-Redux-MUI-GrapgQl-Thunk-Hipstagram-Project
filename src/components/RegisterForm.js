import { Box, Card }            from '@mui/material';
import Button                   from '@mui/material/Button';
import LinkWrap                 from '@mui/material/Link';
import TextField                from "@mui/material/TextField";
import { useEffect, useState }  from 'react';
import { Link }                 from 'react-router-dom';


export default function RegisterPage({onLogin}){

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
                        <h1>Want to be a part of us?</h1>
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
                            <h3>Sign up</h3>
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
                        <h4>Have account?</h4>
                        <Box sx={{display: "block"}}>
                            <Link  to="/login">
                                <LinkWrap
                                level="h3"
                                underline="none"
                                variant="soft">
                                        Go to login
                                </LinkWrap>
                            </Link>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
}

    
