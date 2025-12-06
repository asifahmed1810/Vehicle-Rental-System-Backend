import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router=Router();

router.post("/signup",userControllers.createUser)

router.get("/users", auth(),userControllers.getUser)

router.put("/users/:id",userControllers.updateUser)


export const userRoutes=router;