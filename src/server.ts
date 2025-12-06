import express, { Request, Response } from "express"
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./module/user/user.routes";

const app = express()
const port = config.port;

app.use(express.json());

initDB();

app.use("/api/v1/auth",userRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Vehicle Rental System Backend')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


