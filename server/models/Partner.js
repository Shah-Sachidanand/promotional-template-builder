import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo: {
      type: String, // URL to logo image
    },
    website: {
      type: String,
      trim: true,
    },
    primaryColor: {
      type: String,
      default: '#0A84FF',
    },
    secondaryColor: {
      type: String,
      default: '#5E5CE6',
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    selectedTemplates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;