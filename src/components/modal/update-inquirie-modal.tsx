// components/Updateinquiriesmodal.tsx
"use client";

import { useState } from "react";
import { Modal, Box, TextField, Button, Typography, MenuItem } from "@mui/material";

interface PaymentFormModalProps {
  onFinish: (formData: { invoice: string; paymentStatus: string; totalPrice: string }) => void;
}

const Updateinquiriesmodal: React.FC<PaymentFormModalProps> = ({ onFinish }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    invoice: "",
    paymentStatus: "",
    totalPrice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onFinish(formData); // Pass data to parent component
    setOpen(false); // Close modal
  };

  return (
    <>
      {/* Trigger Button */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Open Payment Form
      </Button>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>

          <TextField
            fullWidth
            label="Invoice"
            name="invoice"
            value={formData.invoice}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Payment Status"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Total Price"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            margin="normal"
          />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Updateinquiriesmodal;