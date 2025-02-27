import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function Msg() {
    const [msg, setMsg] = useState([]);
    
    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL;
        axios.get(`${url}/admin/viewmessages`)
            .then(res => {setMsg(res.data)})
            .catch(err => console.log(err));
    }, []);
    
    const handleResponse = (email) => {
        const url = import.meta.env.VITE_BASE_URL;
        const responseMessage = "Your message has been received, we will get back to you shortly.";
        axios.post(`${url}/admin/respond`, { email, message: responseMessage })
            .then(res => {
                alert(res.data.msg); 
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Message</TableCell>
                        <TableCell align="center">Response</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {msg.map((message, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{message.name}</TableCell>
                            <TableCell align="center">{message.email}</TableCell>
                            <TableCell align="center">{message.message}</TableCell>
                            <TableCell align="center">
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => handleResponse(message.email)}
                                >
                                    Send Response
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
