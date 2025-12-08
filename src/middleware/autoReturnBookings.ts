import { pool } from "../config/db";

export const autoReturnExpiredBookings = async () => {
  await pool.query(`
    UPDATE bookings
    SET status = 'returned'
    WHERE status = 'active' AND rent_end_date < NOW();
  `);

  await pool.query(`
    UPDATE vehicles
    SET availability_status = 'available'
    WHERE id IN (
      SELECT vehicle_id FROM bookings
      WHERE status = 'returned'
    );
  `);
};