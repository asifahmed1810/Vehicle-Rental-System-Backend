import { Request, Response } from "express";
import { bookingService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

const bookings=async(req:Request, res:Response)=>{
     
    try {

        const result=await bookingService.bookings(req.body);
         if (result.notFound) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (result.alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already booked",
      });
    }

    if (result.invalidDates) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data:result.created,
    });

        
    } catch (err:any) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getBookings( req.user as { id: string; role: string } );

    const message =
      req.user!.role === "admin"
        ? "Bookings retrieved successfully"
        : "Your bookings retrieved successfully";

    res.status(200).json({
      success: true,
      message,
      data: bookings,
    });
  } catch (err: any) {
    res.status(500).json({
       success: false,
        message: err.message });
  }
};


const updateBooking=async(req:Request , res:Response)=>{
  const {bookingId}=req.params;
  const user=req.user;
  try {

    const result =await bookingService.updateBooking(bookingId as string,user as {id:string , role:string});

    if (result.notFound){
      return  res.status(404).json({
         success: false, 
         message: "Booking not found" });
    }

    if(result.notAllowed){
       return res.status(403).json({ 
        success: false, 
        message: "You are not allowed to perform this action" });
    }

    if(result.tooLate){
       return res.status(400).json({
        success: false,
        message: "Cannot cancel booking after the start date",
      });
    }

    res.status(400).json({
      success: true,
      message: result.message,
      data: result.data,
    })

    
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message
    })
    
  }
}


export const bookingController={
    bookings,
    getBookings,
    updateBooking
}