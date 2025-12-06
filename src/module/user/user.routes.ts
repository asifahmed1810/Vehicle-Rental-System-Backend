import { Router } from "express";
import { userControllers } from "./user.controller";

const router=Router();

router.post("/signup",userControllers.createUser)

router.get("/users",userControllers.getUser)

router.put("/users/:id",userControllers.updateUser)


export const userRoutes=router;