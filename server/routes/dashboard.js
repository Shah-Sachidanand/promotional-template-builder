import express from 'express';
import { protect } from '../middleware/auth.js';
import Partner from '../models/Partner.js'; // Assuming you have a Partner model
import Template from '../models/Template.js'; // Assuming you have a Template model
import Promotion from '../models/Promotion.js'; // Assuming you have a Promotion model
import User from '../models/User.js'; // Assuming you have a User model

const router = express.Router();

// @desc    Get dashboard summary data
// @route   GET /api/dashboard/summary
// @access  Private
router.get('/summary', protect, async (req, res) => {
  try {
    // Example: Get counts of different entities
    const partnerCount = await Partner.countDocuments({});
    const templateCount = await Template.countDocuments({});
    const promotionCount = await Promotion.countDocuments({});
    const userCount = await User.countDocuments({}); // You might want to restrict this to admins

    // You can add more complex queries here, e.g., recent promotions, active partners, etc.

    res.json({
      partnerCount,
      templateCount,
      promotionCount,
      userCount,
      // Add other summary data here
    });
  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add more specific dashboard routes here as needed,
// e.g., routes to fetch data for charts, recent activity, etc.

export default router;