import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.payload?._id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wholesale/vieworders`)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(userId)
  const filteredOrders = orders.filter((item) => item.productId && item.productId.userid === userId);

console.log("Filtered Orders:", filteredOrders);
  const handleCollect = (orderId) => {
    const status={
      message:"collected",
      id:orderId
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`,status)
    .then((res)=>alert(res.data))
    .catch((err)=>console.log(err))
  };

  const handleCancel = (orderId) => {
    const status={
      message:"cancelled",
      id:orderId
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`,status)
    .then((res)=>alert(res.data))
    .catch((err)=>console.log(err))
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        <strong>Product Purchase Details</strong>
      </Typography>

      {filteredOrders.length === 0 ? (
        <Typography variant="body1" align="center">
          No orders found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.productId.productName}</TableCell>
                <TableCell>{order.quantity} KG</TableCell>
                <TableCell>{new Date(order.productId.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.status.toUpperCase()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleCollect(order._id)}
                  >
                    Collect
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleCancel(order._id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         
      )}
      <Button onClick={()=>navigate('/wholesale')}>BACK TO DASH BOARD </Button>
    </TableContainer>
  );
}
