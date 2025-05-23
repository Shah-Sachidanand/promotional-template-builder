import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['discount', 'offer', 'event', 'productLaunch', 'seasonal'],
      required: [true, 'Template type is required'],
    },
    thumbnail: {
      type: String, // URL to thumbnail image
    },
    sections: [
      {
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['header', 'banner', 'promoDetails', 'redeemCard', 'terms', 'partnerBranding', 'footer'],
          required: true,
        },
        content: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        isEditable: {
          type: Boolean,
          default: false,
        },
        position: {
          type: Number,
          required: true,
        },
      },
    ],
    defaultStyles: {
      fontFamily: {
        type: String,
        default: 'Inter, sans-serif',
      },
      colors: {
        primary: {
          type: String,
          default: '#0A84FF',
        },
        secondary: {
          type: String,
          default: '#5E5CE6',
        },
        accent: {
          type: String,
          default: '#FF9F0A',
        },
        text: {
          type: String,
          default: '#1A1A1A',
        },
        background: {
          type: String,
          default: '#F8F8F8',
        },
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model('Template', templateSchema);

export default Template;