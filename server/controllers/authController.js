import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
        return res.json({
            success: false,
            message: "Please enter your name!"
        })
    }
    if (!email) {
        return res.json({
            success: false,
            message: "Please enter your email!"
        })
    }
    if (!password) {
        return res.json({
            success: false,
            message: "Please enter your password!"
        })
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Dashify",
            text: `Welcome to Dashify, your account has been created with the email id of: ${email}`
        }
        await transporter.sendMail(mailOptions)
        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.json({
            success: false,
            message: "Please enter your email!"
        })
    }
    if (!password) {
        return res.json({
            success: false,
            message: "Enter your password!"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password!"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success: true,
            message: "Logged In successfully"
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        if (user.isAccountVerified) {
            return res.json({
                success: false,
                message: "User is already verified!"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions)
        return res.status(200).json({
            success: true,
            message: "Verification OTP has been sent to your email"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body
    if (!userId) {
        return res.json({
            success: false,
            message: "User not found!"
        })
    }
    if (!otp) {
        return res.json({
            success: false,
            message: "Please enter the otp"
        })
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({
                success: false,
                message: "User not found!"
            })
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP expired"
            })
        }
        user.isAccountVerified = true;
        user.verifyOtp = ''
        user.verifyOtpExpireAt = 0
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Account verified successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Not authorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({ 
            success: true,
            message: "User is logged in"
        })
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
}


export const sendResetOtp = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.json({
            success: false,
            message: "Email not found"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User not found!"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpiresAt = Date.now() + 15 * 60 * 60 * 1000
        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        await transporter.sendMail(mailOptions)
        res.status(200).json({
            success: false,
            message: "OTP for resetting password has been sent to your email"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    if (!email) {
        return res.json({
            success: false,
            message: "Please enter your email"
        })
    }
    if (!otp) {
        return res.json({
            success: false,
            message: "OTP cannot be blank!"
        })
    }
    if (!newPassword) {
        return res.json({
            success: false,
            message: "Please enter a password!"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist!"
            })
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }
        if (user.resetOtpExpiresAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP expired"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpiresAt = 0
        await user.save()
        return res.status(200).json({
            success: false,
            message: "Password changed successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}