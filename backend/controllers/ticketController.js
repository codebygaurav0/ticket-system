const Ticket = require("../models/Ticket");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      userId: req.userId,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get logged-in user's tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get tickets error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      ticket,
    });
  } catch (error) {
    console.error("Get ticket error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// Update Ticket Status
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["open", "in_progress", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Closed ticket cannot be reopened
    if (ticket.status === "closed" && status !== "closed") {
      return res.status(400).json({
        message: "Closed ticket cannot be reopened",
      });
    }

    ticket.status = status;

    await ticket.save();

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
};