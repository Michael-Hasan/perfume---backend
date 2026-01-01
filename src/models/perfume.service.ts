import { PerfumeInput, PerfumeUpdateInput } from "../libs/types/perfume";
import PerfumeModel from "../Schema_models/perfume.model";
import Errors, { Message } from "../libs/error";
import { HttpCode } from "../libs/error";
import { Perfume } from "../libs/types/perfume";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { PerfumeInquiry } from "../libs/types/perfumes";
import { PerfumeStatus } from "../libs/enums/perfume.enum";
import { ObjectId } from "mongoose";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
import ViewService from "./view.service";

class PerfumeService {
  private readonly perfumeModel;
  public viewService: any;

  constructor() {
    (this.perfumeModel = PerfumeModel), (this.viewService = new ViewService());
  }

  // SPA project
  public async getPerfumes(inquiry: PerfumeInquiry): Promise<Perfume[]> {
    console.log("inquiry:", inquiry);

    const match: any = { perfumeStatus: PerfumeStatus.AVAILABLE };

    if (inquiry.perfumeCollection)
      match.perfumeCollection = inquiry.perfumeCollection;

    if (inquiry.search) {
      match.perfumeName = {
        $regex: new RegExp(inquiry.search, "i"),
      };
    }

    const sort: any =
      inquiry.order === "perfumeViews"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.perfumeModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
      ])
      .exec();

    if (!result) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    return result;
  }

  public async getPerfume(
    memberId: ObjectId | null,
    id: string
  ): Promise<Perfume> {
    const perfumeId = shapeIntoMongooseObjectId(id);

    let result = await this.perfumeModel
      .findOne({ _id: perfumeId, perfumeStatus: PerfumeStatus.AVAILABLE })
      .exec();
    console.log("id sent", id);

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: perfumeId,
        viewGroup: ViewGroup.PERFUME,
      };
      const existView = await this.viewService.checkViewExistence(input);

      if (!existView) {
        console.log("Inserting perfume view now...");
        await this.viewService.insertMemberView(input);
        console.log("Inserted!");

        result = await this.perfumeModel
          .findByIdAndUpdate(
            perfumeId,
            { $inc: { perfumeViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result as unknown as Perfume;
  }

  public async getRandomPerfumes(): Promise<Perfume[]> {
    const result = await this.perfumeModel
      .aggregate([
        { $match: { perfumeStatus: PerfumeStatus.AVAILABLE } },
        { $sample: { size: 2 } },
      ])
      .exec();
    console.log("RandomResult:", result);

    if (!result || result.length === 0)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getComingSoonPerfumes(limit: number = 4): Promise<Perfume[]> {
    try {
      return await this.perfumeModel
        .aggregate([
          { $match: { perfumeStatus: PerfumeStatus.OUT_OF_STOCK } },
          { $sample: { size: limit } },
        ])
        .exec();
    } catch (err) {
      console.error("Error fetching coming soon perfume:", err);
      throw new Error("Failed to fetch coming soon perfume");
    }
  }

  // SSR project

  public async getAllPerfumes(): Promise<Perfume[]> {
    const result = await this.perfumeModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as unknown as Perfume[];
  }

  public async createNewProduct(input: PerfumeInput): Promise<Perfume> {
    try {
      const result = await this.perfumeModel.create(input);
      return result as unknown as Perfume;
    } catch (err) {
      console.error("error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenPerfume(
    id: string,
    input: PerfumeUpdateInput
  ): Promise<Perfume> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.perfumeModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result as unknown as Perfume;
  }
}

export default PerfumeService;
