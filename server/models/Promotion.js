import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Promotion name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
      required: [true, 'Partner is required'],
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: [true, 'Template is required'],
    },
    customizedSections: [
      {
        sectionId: {
          type: String,
          required: true,
        },
        content: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'active', 'ended', 'archived'],
      default: 'draft',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    url: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    analytics: {
      views: {
        type: Number,
        default: 0,
      },
      clicks: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Automatically update status based on dates
promotionSchema.pre('save', function(next) {
  const now = new Date();
  
  if (this.isPublished) {
    if (now < this.startDate) {
      this.status = 'scheduled';
    } else if (now >= this.startDate && now <= this.endDate) {
      this.status = 'active';
    } else if (now > this.endDate) {
      this.status = 'ended';
    }
  }
  
  next();
});

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;