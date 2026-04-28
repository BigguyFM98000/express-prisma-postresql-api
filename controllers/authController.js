import {prisma} from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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

    // Generate JWT Token
    const token = generateToken(user.id);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            },
            token
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // ✅ Validate input FIRST
    if (!email || !password) {
        return res.status(400).json({
            error: "Email, and password are required"
        });
    }
    
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: {email}
    });

    if(!userExists){
        return res.status(401).json({error: "Invalid email or password"});
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({error: "Invalid email or password"});
    }

    // Generate JWT Token
    const token = generateToken(user.id);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            },
            token
        }
    });
}

export {register, login}