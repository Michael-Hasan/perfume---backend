import express from "express";
const router = express.Router();
import uploader from "./libs/utils/uploader";
import orderController from "./controllers/order.controller";
import memberController from "./controllers/member.contoller";
import perfumeController from "./controllers/perfume.controller";

router.get("/member/store", memberController.getStore);
router.post("/member/login", memberController.Login);
router.post("/member/signUp", memberController.SignUp);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetails
);

// Update member
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

// /Perfumes

router.get("/perfume/all", perfumeController.getPerfumes);
router.get("/perfume/coming", perfumeController.getComingSoonPerfumes);
router.get("/perfume/random", perfumeController.getRandomPerfumes);
router.get(
  "/perfume/:id",
  memberController.retrieveAuth,
  perfumeController.getPerfume
);

// Orders
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);
router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;
