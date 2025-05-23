import express from 'express';
import Promotion from '../models/Promotion.js'; // Assuming you have a Promotion model
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new promotion
// @route   POST /api/promotions
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      partner,
      template,
      customizedSections,
      status,
      startDate,
      endDate,
      url,
      isPublished,
    } = req.body;

    const promotion = new Promotion({
      name,
      description,
      partner,
      template,
      customizedSections,
      status,
      startDate,
      endDate,
      url,
      isPublished,
      createdBy: req.user._id, // Assign the logged-in user as the creator
    });

    const createdPromotion = await promotion.save();
    res.status(201).json(createdPromotion);
  } catch (error) {
    console.error('Create promotion error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get all promotions
// @route   GET /api/promotions
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // You might want to filter promotions based on the user's partner or role
    const promotions = await Promotion.find({})
      .populate('partner', 'name') // Populate partner name
      .populate('template', 'name'); // Populate template name
    res.json(promotions);
  } catch (error) {
    console.error('Get all promotions error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single promotion by ID
// @route   GET /api/promotions/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id)
      .populate('partner', 'name') // Populate partner name
      .populate('template', 'name'); // Populate template name

    if (promotion) {
      // Add logic here to check if the user has access to this promotion
      res.json(promotion);
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error('Get promotion by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update a promotion
// @route   PUT /api/promotions/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      partner,
      template,
      customizedSections,
      status,
      startDate,
      endDate,
      url,
      isPublished,
    } = req.body;

    const promotion = await Promotion.findById(req.params.id);

    if (promotion) {
      promotion.name = name || promotion.name;
      promotion.description = description || promotion.description;
      promotion.partner = partner || promotion.partner;
      promotion.template = template || promotion.template;
      promotion.customizedSections = customizedSections || promotion.customizedSections;
      promotion.status = status || promotion.status;
      promotion.startDate = startDate || promotion.startDate;
      promotion.endDate = endDate || promotion.endDate;
      promotion.url = url || promotion.url;
      promotion.isPublished = isPublished !== undefined ? isPublished : promotion.isPublished;


      const updatedPromotion = await promotion.save();
      res.json(updatedPromotion);
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error('Update promotion error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete a promotion
// @route   DELETE /api/promotions/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (promotion) {
      await promotion.deleteOne();
      res.json({ message: 'Promotion removed' });
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error('Delete promotion error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;