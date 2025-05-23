import express from 'express';
import Partner from '../models/Partner.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new partner
// @route   POST /api/partners
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, logo, website, primaryColor, secondaryColor, contactName, contactEmail, contactPhone, selectedTemplates, active } = req.body;

    const partner = new Partner({
      name,
      description,
      logo,
      website,
      primaryColor,
      secondaryColor,
      contactName,
      contactEmail,
      contactPhone,
      selectedTemplates,
      active,
      createdBy: req.user._id, // Assign the logged-in user as the creator
    });

    const createdPartner = await partner.save();
    res.status(201).json(createdPartner);
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get all partners
// @route   GET /api/partners
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const partners = await Partner.find({}).populate('selectedTemplates', 'name'); // Populate template names if needed
    res.json(partners);
  } catch (error) {
    console.error('Get all partners error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single partner by ID
// @route   GET /api/partners/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).populate('selectedTemplates', 'name'); // Populate template names if needed

    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    console.error('Get partner by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update a partner
// @route   PUT /api/partners/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, logo, website, primaryColor, secondaryColor, contactName, contactEmail, contactPhone, selectedTemplates, active } = req.body;

    const partner = await Partner.findById(req.params.id);

    if (partner) {
      partner.name = name || partner.name;
      partner.description = description || partner.description;
      partner.logo = logo || partner.logo;
      partner.website = website || partner.website;
      partner.primaryColor = primaryColor || partner.primaryColor;
      partner.secondaryColor = secondaryColor || partner.secondaryColor;
      partner.contactName = contactName || partner.contactName;
      partner.contactEmail = contactEmail || partner.contactEmail;
      partner.contactPhone = contactPhone || partner.contactPhone;
      partner.selectedTemplates = selectedTemplates || partner.selectedTemplates;
      partner.active = active !== undefined ? active : partner.active;

      const updatedPartner = await partner.save();
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete a partner
// @route   DELETE /api/partners/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      await partner.deleteOne();
      res.json({ message: 'Partner removed' });
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;