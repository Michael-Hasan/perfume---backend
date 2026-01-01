import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";
import { Perfume } from "./perfume";

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: Number;
  itemPrice: Number;
  orderId: ObjectId;
  PerfumeId: ObjectId;
  createAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderStatus: OrderStatus;
  memberId: ObjectId;
  createAt: Date;
  updatedAt: Date;
  // From aggregations
  orderItems: [];
  perfumeDate: Perfume[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  perfumeId: ObjectId;
  orderId?: ObjectId;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}
