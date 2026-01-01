import express from "express";
import storeController from "./controllers/store.controller";
import perfumeController from "./controllers/perfume.controller";
import makeUploader from "./libs/utils/uploader";

/* Store*/
const uploadPerfumeImages = makeUploader("perfumes").array("perfumeImages", 5);
const routerAdmin = express.Router();

routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);

routerAdmin
  .get("/signup", storeController.getSignUp)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    storeController.processSignUp
  );

routerAdmin.get("/check-me", storeController.checkAuthSession);
routerAdmin.get("/logout", storeController.LogOut);

/* Perfume*/
routerAdmin.get(
  "/perfume/all",
  storeController.verifyStore,
  perfumeController.getAllPerfumes
);

routerAdmin.post(
  "/perfume/create",
  storeController.verifyStore,
  uploadPerfumeImages,
  perfumeController.createNewProduct
);
routerAdmin.post(
  "/perfume/:id",
  storeController.verifyStore,
  perfumeController.updateChosenPerfume
);

routerAdmin.get(
  "/user/all",
  storeController.verifyStore,
  storeController.getUsers
);

routerAdmin.post(
  "/user/edit",
  storeController.verifyStore,
  storeController.updateChosenUser
);

/* Users*/
export default routerAdmin;
