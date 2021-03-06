import mongoose from 'mongoose'
import User from './User'
import Country from './Country'
import Seaport from './Seaport'
import Airport from './Airport'

const townScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Country,
      required: true,
    },
    isPort: { type: Boolean, required: true },
    seaport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Seaport,
    },
    airport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Airport,
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

const Town = mongoose.models.Town || mongoose.model('Town', townScheme)
export default Town
