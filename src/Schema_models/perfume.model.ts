import mongoose, { Schema } from "mongoose";
import {
  PerfumeCollection,
  PerfumeSize,
  PerfumeStatus,
  PerfumeBrand,
} from "../libs/enums/perfume.enum";

const perfumeSchema = new Schema(
  {
    perfumeStatus: {
      type: String,
      enum: PerfumeStatus,
      default: PerfumeStatus.OUT_OF_STOCK,
    },

    perfumeName: {
      type: String,
      required: true,
    },

    perfumeCollection: {
      type: String,
      enum: PerfumeCollection,
      required: true,
    },

    perfumePrice: {
      type: Number,
      required: true,
    },

    perfumeLeftCount: {
      type: Number,
      default: 0,
    },

    perfumeSize: {
      type: String,
      enum: PerfumeSize,
      default: PerfumeSize.MEDIUM,
    },

    perfumeBrand: {
      type: String,
      enum: PerfumeBrand,
      default: PerfumeBrand.Chanel,
    },

    perfumeDesc: {
      type: String,
      required: true,
    },

    perfumeImages: {
      type: Array,
      default: [],
    },

    perfumeViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

perfumeSchema.index({ perfumeName: 1, perfumeVolume: 1 }, { unique: true });

export default mongoose.model("Perfume", perfumeSchema);
