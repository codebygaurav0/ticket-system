const express = require("express");

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTicket);

router.get("/", authMiddleware, getTickets);

router.get("/:id", authMiddleware, getTicketById);

router.patch("/:id/status", authMiddleware, updateTicketStatus);

module.exports = router;