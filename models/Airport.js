import mongoose from 'mongoose'
import Country from './Country'
import User from './User'

const airportScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Country,
      required: true,
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
)

const Airport =
  mongoose.models.Airport || mongoose.model('Airport', airportScheme)
export default Airport
