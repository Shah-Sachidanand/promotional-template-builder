import express from 'express';
import Template from '../models/Template.js'; // Assuming you have a Template model
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new template
// @route   POST /api/templates
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, content, createdBy, partner } = req.body;

    const template = new Template({
      name,
      description,
      content,
      createdBy: req.user._id, // Assign the logged-in user as the creator
      partner, // Link to a partner if applicable
    });

    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get all templates
// @route   GET /api/templates
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // You might want to filter templates based on the user's partner or role
    const templates = await Template.find({}).populate('partner', 'name'); // Populate partner name if needed
    res.json(templates);
  } catch (error) {
    console.error('Get all templates error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single template by ID
// @route   GET /api/templates/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id).populate('partner', 'name'); // Populate partner name if needed

    if (template) {
      // Add logic here to check if the user has access to this template
      res.json(template);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error('Get template by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update a template
// @route   PUT /api/templates/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, content, partner } = req.body;

    const template = await Template.findById(req.params.id);

    if (template) {
      template.name = name || template.name;
      template.description = description || template.description;
      template.content = content || template.content;
      template.partner = partner || template.partner;

      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete a template
// @route   DELETE /api/templates/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (template) {
      await template.deleteOne();
      res.json({ message: 'Template removed' });
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;