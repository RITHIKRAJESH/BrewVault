// import { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { 
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
//   Typography, CircularProgress, Box 
// } from "@mui/material";

// export default function ViewOrderedProducts() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//  const token = localStorage.getItem("token");
//    let userId = null;
//    if (token) {
//      try {
//        const decoded = jwtDecode(token);
//        userId = decoded?.payload?._id; // Ensure correct token structure
//      } catch (error) {
//        console.error("Invalid token:", error);
//      }
//    }
 
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const url = import.meta.env.VITE_BASE_URL;
//         const response = await axios.get(`${url}/user/vieworders`,{headers:{id:userId}});
//         setOrders(response.data);
//         console.log(orders.length)
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const orderings= orders.filter((order) => order.status != "paid");
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Ordered Products
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableRow>
//                 <TableCell><strong>Order ID</strong></TableCell>
//                 <TableCell><strong>Product Name</strong></TableCell>
//                 <TableCell><strong>Quantity</strong></TableCell>
//                 <TableCell><strong>Date</strong></TableCell>
//                 <TableCell><strong>Status</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//   {orderings.length > 0 ? (
//     orderings.map((order, index) => (
//       <TableRow key={index}>
//         <TableCell>{order._id}</TableCell>
//         <TableCell>{order.productId?.productName || "N/A"}</TableCell>
//         <TableCell>{order.quantity}</TableCell>
//         <TableCell>{order.productId?.date || "N/A"}</TableCell>
//         <TableCell>{order.status || "N/A"}</TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={5} align="center">
//         No orders to be collected
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>

//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewOrderedProduct() {
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

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wholesale/vieworders`)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredOrders = orders.filter(
    (item) =>
      item.productId &&
      item.productId.userid === userId &&
      item.status !== "paid" &&
      item.status !== "cancelled"
  );

  const handleCollect = (orderId) => {
    const status = {
      message: "collected",
      id: orderId,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`, status)
      .then((res) => {
        alert(res.data);
        // Reload the page after status update
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = (orderId) => {
    const status = {
      message: "cancelled",
      id: orderId,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`, status)
      .then((res) => {
        alert(res.data);
        // Reload the page after status update
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}>
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
                  {order.status !== "collected" && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleCollect(order._id)}
                    >
                      Accept
                    </Button>
                  )}

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

      <Button onClick={() => navigate("/wholesale")}>BACK TO DASHBOARD</Button>
    </TableContainer>
  );
}
