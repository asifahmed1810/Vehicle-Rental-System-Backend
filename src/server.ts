import express, { Request, Response } from "express"
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./module/user/user.routes";
import { authRoutes } from "./module/auth/auth.routes";
import { vehicleRoutes } from "./module/vehicles/vehicle.routes";

const app = express()
const port = config.port;

app.use(express.json());

initDB();

app.use("/api/v1",userRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/vehicle",vehicleRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Vehicle Rental System Backend')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


