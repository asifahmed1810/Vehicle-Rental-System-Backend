import { pool } from "../../config/db"
import bcrypt from "bcryptjs"

const createUser=async(payload:Record<string,unknown>)=>{
    const {name, email,password,phone,role}=payload;
   const hashPass= await bcrypt.hash(password as string,10)

   const result =await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,hashPass,phone,role])

   return result
}


const updateUser=async(name:string, email:string,password:string,phone:string,id:string)=>{
    
    const result=pool.query(`UPDATE users SET name=$1 , email=$2 , password=$3 , phone=$4 WHERE id=$5 RETURNING *`,[name,email,password,phone,id])
    return result;
}

export const userService={
    createUser,
    updateUser
}