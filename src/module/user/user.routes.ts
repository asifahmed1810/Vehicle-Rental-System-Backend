import { Router } from "express";
import { userControllers } from "./user.controller";

const router=Router();

router.post("/signup",userControllers.createUser)
router.put("/users/:id",userControllers.updateUser)


export const userRoutes=router;