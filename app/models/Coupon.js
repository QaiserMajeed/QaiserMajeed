const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema(
  {
    coupon: { type: String },
    percentage: { type: Number },
    is_active: { type: Number, default: 1 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User id is required.',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Coupon', CouponSchema);
