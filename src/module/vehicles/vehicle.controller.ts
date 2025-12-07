import { Request, response, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicle(req.body);

    res.status(200).json({
      success: true,
      message: "Vehicle data created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicle();

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "There is no Vehicle data Available",
      });
    }else{

        
    res.status(200).json({
      success: true,
      message: "Vehicles data get successfully",
      data: result.rows,
    });
    }

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const singleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.singleVehicle(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle data retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateVehicle(
      req.body,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle data updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.id!);

    if (result.notFound) {
      return res.status(404).json({
        success: false,
        message: "Vehicle data not found",
      });
    }

    if (result.booked) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete vehicle. Vehicle is currently booked",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result.deleted,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicle,
  singleVehicle,
  updateVehicle,
  deleteVehicle,
};
