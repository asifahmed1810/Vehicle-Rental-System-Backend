import { pool } from "../../config/db";

const bookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleCheck = await pool.query(
    `SELECT vehicle_name,daily_rent_price , availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleCheck.rows.length === 0) {
    return { notFound: true };
  }

  const vehicle = vehicleCheck.rows[0];

  if (vehicle.availability_status === "booked") {
    return { alreadyBooked: true };
  }

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const diffTime = end.getTime() - start.getTime();

  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return { invalidDates: true };
  }

  const total_price = Number(vehicle.daily_rent_price) * days;

  const result = await pool.query(
    `INSERT INTO bookings (
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status
     ) VALUES ($1, $2, $3, $4, $5, 'active')
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id]
  );

  return {
    created: {
      ...result.rows[0],
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    },
  };
};

const getBookings = async (user: { id: string; role: string }) => {


  let query = ``;
  let params: any[] = [];

  if (user.role === "admin") {
    query = `SELECT b.*, u.name AS customer_name ,u.email AS customer_email , v.vehicle_name ,v.registration_number , v.type FROM bookings b 
    JOIN users u ON b.customer_id =u.id 
    JOIN vehicles v ON b.vehicle_id=v.id
    ORDER BY b.id DESC`;
  } else {
    query = `SELECT b.* , v.vehicle_name, v.registration_number,v.type FROM bookings b
    JOIN vehicles v ON b.vehicle_id=v.id
    WHERE b.customer_id=$1 ORDER BY b.id DESC`;
    params = [Number(user.id)];
  }

  const result = await pool.query(query, params);

  
  const formatted = result.rows.map((row) => {
    if (user.role === "admin") {
      return {
        id: row.id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date.toISOString().split("T")[0],
        rent_end_date: row.rent_end_date.toISOString().split("T")[0],
        total_price: Number(row.total_price),
        status: row.status,
        customer: {
          name: row.customer_name,
          email: row.customer_email,
        },
        vehicle: {
          vehicle_name: row.vehicle_name,
          registration_number: row.registration_number,
        },
      };
    } else {
      return {
        id: row.id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date.toISOString().split("T")[0],
        rent_end_date: row.rent_end_date.toISOString().split("T")[0],
        total_price: Number(row.total_price),
        status: row.status,
        vehicle: {
          vehicle_name: row.vehicle_name,
          registration_number: row.registration_number,
          type: row.type,
        },
      };
    }
  });

  return formatted;
};

const updateBooking = async (
  bookingId: string,
  user: { id: string; role: string }
) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingRes.rows.length === 0) {
    return { notFound: true };
  }

  const booking = bookingRes.rows[0];

  const now = new Date();

  const bookingStart = new Date(booking.rent_start_date);

  if (user.role === "customer") {
    if (booking.customer_id !== Number(user.id)) {
      return { notAllowed: true };
    }

    if (now >= bookingStart) {
      return { tooLate: true };
    }
    const result = await pool.query(
      `UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    return {
      message: "Booking Cancel Successfully",
      data: result.rows[0],
    };
  }

  if(user.role==="admin"){
     const update=await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *`,[bookingId])
     await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id=$1 `,[booking.vehicle_id])

     return {
      message:"Booking marked as returned",
      data:update.rows[0]
     }

  }

  return {
    notAllowed:true
  }





};

export const bookingService = {
  bookings,
  getBookings,
  updateBooking
};
