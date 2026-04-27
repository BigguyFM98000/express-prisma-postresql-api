import {prisma} from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    const { name, email, password } = req.body;
   
    // ✅ Validate input FIRST
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email, and password are required"
        });
    }
    
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: {email}
    });

    if(userExists){
        return res.status(400).json({error: "User already exists with this email"});
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            }
        }
    });
}

export {register}