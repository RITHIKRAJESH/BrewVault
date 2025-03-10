// import { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Payment} from "@mui/icons-material";

// export default function ViewOrders() {
//   const [orders, setOrders] = useState([]);
//   const [selectedQuality, setSelectedQuality] = useState({});
//   const [totalAmount, setTotalAmount] = useState({});
//   const [openPaymentModal, setOpenPaymentModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const token = localStorage.getItem("token");
//   let userId = null;

//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       userId = decoded?.payload?._id;
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/wholesale/vieworders`)
//       .then((res) => {
//         setOrders(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const filteredOrders = orders.filter(
//     (item) =>
//       item.productId &&
//       item.productId.userid === userId &&
//       item.status !== "paid" &&
//       item.status !== "cancelled"
//   );

//   const handleCollect = (orderId) => {
//     const status = {
//       message: "collected",
//       id: orderId,
//     };
//     axios
//       .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`, status)
//       .then((res) => {
//         alert(res.data);
//         // Reload the page after status update
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleCancel = (orderId) => {
//     const status = {
//       message: "cancelled",
//       id: orderId,
//     };
//     axios
//       .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatestatus`, status)
//       .then((res) => {
//         alert(res.data);
//         // Reload the page after status update
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handlePayment = (orderId) => {
//     const selectedOrder = orders.find((order) => order._id === orderId);
//     setSelectedOrder(selectedOrder);
//     setOpenPaymentModal(true);
//   };

//   const handleQualityChange = (orderId, quality, price) => {
//     setSelectedQuality((prev) => ({
//       ...prev,
//       [orderId]: quality,
//     }));

//     setTotalAmount((prev) => ({
//       ...prev,
//       [orderId]: price * filteredOrders.find((order) => order._id === orderId).quantity,
//     }));
//   };

//   const handleClosePaymentModal = () => {
//     setOpenPaymentModal(false);
//     setPaymentSuccess(false);
//   };

//   const updateOrderAfterPayment = (orderId, updatedData) => {
//     // Make an API call to update the order's quantity, total price, and status
//     axios
//       .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatepayment`, {
//         id: orderId,
//         ...updatedData,
//       })
//       .then((response) => {
//         console.log(response.data); // Log response if needed
//         setPaymentSuccess(true);
//         setTimeout(() => {
//           setOpenPaymentModal(false);
//           window.location.reload();
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error("Error updating order:", error);
//       });
//   };

//   const handleMakePayment = () => {
//     const updatedData = {
//       status: "paid", 
//       quality: selectedOrder.quality,
//       totalprice: totalAmount[selectedOrder._id], 
//     };

//     updateOrderAfterPayment(selectedOrder._id, updatedData);
//   };

//   return (
//     <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}>
//   <Typography variant="h5" align="center" gutterBottom>
//     <strong>Product Purchase Details</strong>
//   </Typography>

//   {filteredOrders.length === 0 ? (
//     <Typography variant="body1" align="center">
//       No orders found.
//     </Typography>
//   ) : (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
//           <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
//           <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
//           <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>

//           {/* Conditionally render Quality column */}
//           {filteredOrders.some((order) => order.status === "collected") && (
//             <TableCell sx={{ fontWeight: "bold" }}>Quality</TableCell>
//           )}

//           {/* Conditionally render Total Amount column */}
//           {filteredOrders.some((order) => order.status === "collected") && (
//             <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
//           )}

//           <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
//         </TableRow>
//       </TableHead>

//       <TableBody>
//         {filteredOrders.map((order) => (
//           <TableRow key={order._id}>
//             <TableCell>{order.productId.productName}</TableCell>
//             <TableCell>{order.quantity} KG</TableCell>
//             <TableCell>{new Date(order.productId.date).toLocaleDateString()}</TableCell>
//             <TableCell>{order.status.toUpperCase()}</TableCell>

//             {/* Conditionally render Quality column */}
//             {order.status === "collected" && (
//               <TableCell>
//                 <FormControl fullWidth>
//                   <InputLabel>Quality</InputLabel>
//                   <Select
//                     value={selectedQuality[order._id] || ""}
//                     label="Quality"
//                     onChange={(e) => {
//                       const selectedOption = e.target.value;
//                       const selectedProduct = order.productId.productCategory.find(
//                         (item) => item.quality === selectedOption
//                       );
//                       handleQualityChange(order._id, selectedOption, selectedProduct.price);
//                     }}
//                   >
//                     {order.productId.productCategory.map((category) => (
//                       <MenuItem key={category._id} value={category.quality}>
//                         {category.quality}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </TableCell>
//             )}

//             {/* Conditionally render Total Amount column */}
//             {order.status === "collected" && (
//               <TableCell>{totalAmount[order._id] ? `₹${totalAmount[order._id]}` : "-"}</TableCell>
//             )}

//             <TableCell>
//               {order.status !== "collected" && (
//                 <Button
//                   variant="contained"
//                   color="success"
//                   size="small"
//                   sx={{ mr: 1 }}
//                   onClick={() => handleCollect(order._id)}
//                 >
//                   Collect
//                 </Button>
//               )}

//               <Button
//                 variant="contained"
//                 color="error"
//                 size="small"
//                 onClick={() => handleCancel(order._id)}
//               >
//                 Cancel
//               </Button>

//               {order.status === "collected" && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={() => handlePayment(order._id)}
//                 >
//                   Pay Now
//                 </Button>
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )}

//   {/* Payment Modal */}
//   <Dialog open={openPaymentModal} onClose={handleClosePaymentModal} maxWidth="sm" fullWidth>
//     <DialogTitle>Payment Details</DialogTitle>
//     <DialogContent>
//       {selectedOrder && (
//         <div>
//           <Typography variant="h6">Account Number: {selectedOrder.userId.accountno}</Typography>
//           <Typography variant="h6">IFSC: {selectedOrder.userId.ifsc}</Typography>
//           <Typography variant="h6">Username: {selectedOrder.userId.username}</Typography>

//           {/* Simulate showing payment amount */}
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Total Amount: ₹{totalAmount[selectedOrder._id]}
//           </Typography>
//         </div>
//       )}
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClosePaymentModal} color="secondary">
//         Cancel
//       </Button>
//       <Button onClick={handleMakePayment} color="primary" variant="contained">
//         Make Payment
//       </Button>
//     </DialogActions>
//     {paymentSuccess && (
//       <Typography variant="h6" color="success" align="center" sx={{ mt: 2 }}>
//         <Payment/>Payment Successfully Completed
//       </Typography>
//     )}
//   </Dialog>

//   <Button onClick={() => navigate("/wholesale")}>BACK TO DASHBOARD</Button>
// </TableContainer>

//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, CircularProgress, Box, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import { Payment } from "@mui/icons-material";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState({});
  const [totalAmount, setTotalAmount] = useState({});
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.payload?._id; // Ensure correct token structure
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/user/vieworders`, { headers: { id: userId } });
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const orderings = orders.filter((order) => order.status !== "paid");

  const handleQualityChange = (orderId, quality, price) => {
    setSelectedQuality((prev) => ({
      ...prev,
      [orderId]: quality,
    }));

    setTotalAmount((prev) => ({
      ...prev,
      [orderId]: price * orderings.find((order) => order._id === orderId).quantity,
    }));
  };

  const handlePayment = (orderId) => {
    const selectedOrder = orders.find((order) => order._id === orderId);
    setSelectedOrder(selectedOrder);
    console.log("Selected Orders",selectedOrder)
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
  };

  const updateOrderAfterPayment = (orderId, updatedData) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/wholesale/updatepayment`, {
        id: orderId,
        ...updatedData,
      })
      .then((response) => {
        console.log(response.data); // Log response if needed
        setOpenPaymentModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const handleMakePayment = () => {
    const updatedData = {
      status: "paid",
      quality: selectedOrder.quality,
      totalprice: totalAmount[selectedOrder._id],
    };
    updateOrderAfterPayment(selectedOrder._id, updatedData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Ordered Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Quality</strong></TableCell>
                <TableCell><strong>Total Amount</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderings.length > 0 ? (
                orderings.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.productId?.productName || "N/A"}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{new Date(order.productId?.date).toLocaleDateString() || "N/A"}</TableCell>
                    <TableCell>{order.status || "N/A"}</TableCell>
                    
                    {/* Quality selection */}
                    <TableCell>
                      {order.status !== "paid" && (
                        <FormControl fullWidth>
                          <InputLabel>Quality</InputLabel>
                          <Select
                            value={selectedQuality[order._id] || ""}
                            label="Quality"
                            onChange={(e) => {
                              const selectedOption = e.target.value;
                              const selectedProduct = order.productId.productCategory.find(
                                (item) => item.quality === selectedOption
                              );
                              handleQualityChange(order._id, selectedOption, selectedProduct.price);
                            }}
                          >
                            {order.productId.productCategory.map((category) => (
                              <MenuItem key={category._id} value={category.quality}>
                                {category.quality}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </TableCell>
                    
                    {/* Total Amount */}
                    <TableCell>{totalAmount[order._id] ? `₹${totalAmount[order._id]}` : "-"}</TableCell>

                    <TableCell>
                      {/* Action Buttons */}
                      {order.status !== "paid" && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handlePayment(order._id)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders to be collected
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Payment Modal */}
      <Dialog open={openPaymentModal} onClose={handleClosePaymentModal} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <Typography variant="h6">Account Number:abc1234567890123456</Typography>
              <Typography variant="h6">IFSC: sbin1234</Typography>
              {/* <Typography variant="h6">Username: {selectedOrder.userId?.username}</Typography> */}

              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Amount: ₹{totalAmount[selectedOrder._id]}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleMakePayment} color="primary" variant="contained">
            Make Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
