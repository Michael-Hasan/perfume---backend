import {
  PerfumeCollection,
  PerfumeSize,
  PerfumeStatus,
} from "../enums/perfume.enum";
import { ObjectId } from "mongoose";

export interface Perfume {
  _id: ObjectId;
  perfumeStatus: PerfumeStatus;
  perfumeCollection: PerfumeCollection;
  perfumeName: string;
  perfumePrice: number;
  perfumeLeftCount: number;
  perfumeSize: PerfumeSize;
  perfumeVolume: number;
  perfumeDesc?: string;
  perfumeImages: string[];
  perfumeViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PerfumeInquiry {
  order: string;
  page: number;
  limit: number;
  perfumeCollection?: PerfumeCollection;
  search?: string;
}

export interface PerfumeInput {
  perfumeStatus?: PerfumeStatus;
  perfumeCollection: PerfumeCollection;
  perfumeName: string;
  perfumePrice: number;
  perfumeLeftCount: number;
  perfumeSize?: PerfumeSize;
  perfumeVolume?: number;
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
  perfumeVolume?: number;
  perfumeDesc?: string;
  perfumeImages?: string[];
  perfumeViews?: number;
}
