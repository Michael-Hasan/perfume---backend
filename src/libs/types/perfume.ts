import { ObjectId } from "mongoose";
import {
  PerfumeCollection,
  PerfumeStatus,
  PerfumeSize,
  PerfumeBrand,
} from "../enums/perfume.enum";

export interface Perfume {
  _id: ObjectId;
  perfumeStatus: PerfumeStatus;
  perfumeCollection: PerfumeCollection;
  perfumeName: string;
  perfumePrice: number;
  perfumeLeftCount: number;
  perfumeSize: PerfumeSize;
  perfumeCapacity: PerfumeBrand;
  perfumeDesc?: string;
  perfumeImages: string[];
  perfumeViews: number;
  perfumeVolume: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PerfumeInput {
  perfumeStatus?: PerfumeStatus;
  perfumeCollection: PerfumeCollection;
  perfumeName: string;
  perfumePrice: number;
  perfumeLeftCount: number;
  perfumeSize?: PerfumeSize;
  perfumeBrand?: PerfumeBrand;
  perfumeDesc?: string;
  perfumeImages: string[];
  perfumeViews: number;
}

export interface PerfumeUpdateInput {
  _id: ObjectId;
  perfumeStatus?: PerfumeStatus;
  perfumeCollection?: PerfumeCollection;
  perfumeName?: string;
  perfumePrice?: number;
  perfumeLeftCount?: number;
  perfumeSize?: PerfumeSize;
  perfumeBrand?: PerfumeBrand;
  perfumeDesc?: string;
  perfumeImages?: string[];
  perfumeViews?: number;
}
