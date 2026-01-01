import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/error";
import { Request, Response } from "express";
import PerfumeService from "../models/perfume.service";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { PerfumeCollection } from "../libs/enums/perfume.enum";
import { Perfume, PerfumeInput, PerfumeInquiry } from "../libs/types/perfumes";
import { Types } from "mongoose";

const perfumeService = new PerfumeService();

const perfumeController: T = {};
//SPA
perfumeController.getPerfumes = async (req: Request, res: Response) => {
  try {
    const { page, limit, order, perfumeCollection, search } = req.query;
    const inquiry: PerfumeInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (perfumeCollection)
      inquiry.perfumeCollection = perfumeCollection as PerfumeCollection;
    if (search) inquiry.search = String(search);
    const result = await perfumeService.getPerfumes(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
perfumeController.getPerfume = async (
  req: { params: { id: any }; member: { _id: null } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: Perfume): void; new (): any };
    };
  }
) => {
  try {
    const { id } = req.params;
    const memberId = req.member?._id || null; // <-- important

    const result = await perfumeService.getPerfume(memberId, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json;
  }
};

perfumeController.getRandomPerfumes = async (req: Request, res: Response) => {
  try {
    const result = await perfumeService.getRandomPerfumes();
    res.status(HttpCode.OK).json({ perfumes: result });
  } catch (err) {
    console.log("Error getRandomPerfumes", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

perfumeController.getComingSoonPerfumes = async (
  req: Request,
  res: Response
) => {
  try {
    const perfumes = await perfumeController.getComingSoonPerfumes(4);
    res.status(HttpCode.OK).json(perfumes);
  } catch (err) {
    console.error("Error in getComingSoonPerfumes:", err);
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.UPDATE_FAILED));
  }
};

// SSR

perfumeController.getAllPerfumes = async (req: Request, res: Response) => {
  try {
    console.log("Body:", req.body);
    const data = await perfumeService.getAllPerfumes();
    console.log("data:", data);
    res.render("perfumes", { perfumes: data });
  } catch (err) {
    console.log("Error getAllPerfumes", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

perfumeController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("Body:");
    console.log("req.files:", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: PerfumeInput = req.body;
    data.perfumeImages = req.files?.map((ele) => {
      return ele.path;
    });

    await perfumeService.createNewProduct(data);

    res.send(
      `<script> alert ("Succesfully created"); window.location.replace('/admin/perfume/all') </script>`
    );

    console.log("data", data);
  } catch (err) {
    console.log("Error createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/perfume/all') </script>`
    );
  }
};

perfumeController.updateChosenPerfume = async (req: Request, res: Response) => {
  try {
    console.log("Body:", req.body);
    const id = req.params.id;

    const result = await perfumeService.updateChosenPerfume(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error updateChosenProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default perfumeController;
