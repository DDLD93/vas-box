const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config").app

class UserCTRL {
    constructor() {

    }

    async registerLocal(data) {
        const { email, password } = data
        try {
            const existingUser = await UserModel.exists({ email });
            if (existingUser) {
                return { ok: false, message: "Email is already registered" };
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            Object.assign(data, { password: hashedPassword});
            data.password = hashedPassword
            const newUser = new UserModel(data);
            const savedUser = await newUser.save();


            // Remove sensitive values from the savedUser object
            const { password: _, ...userWithoutPassword } = savedUser.toObject();
            return { ok: true, user: userWithoutPassword };
        } catch (error) {
            return { ok: false, error: error.message, message: "An error occurred during registration. Please try again later." };
        }
    }

    async loginLocal(email, password) {
        try {
            const user = await UserModel.findOne({ email, status: "Active" }).select('+password');

            if (!user) {
                // Account not found
                return { ok: false, code: 400, message: "Invalid email or password" };
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return { ok: false, code: 400, message: "Invalid email or password" };
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    userType: user.userType
                },
                jwtSecret
            );

            // Remove password field from the user object
            const { password: _, ...userWithoutPassword } = user.toObject();

            return { ok: true, code: 200, user: userWithoutPassword, token };
        }
        // Invalid password

        catch (error) {
            // Error occurred during login
            return { ok: false, code: 400, message: error.message };
        }
    }






    async addUser(data) {
        let newMsgs = new UserModel(data)
        try {
            let data = await newMsgs.save()
            return { ok: true, data }
        } catch (error) {
            console.log(error)
            return { ok: false, error }
        }
    }
    async getUsers() {
        try {
            let data = await UserModel.find()
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }
    async getUser(id) {
        try {
            let data = await UserModel.findById(id)
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }
    async updateUser(id, newData) {
        try {
            let data = await UserModel.findByIdAndUpdate(id, newData, { new: true })
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }

    async deleteUser(id) {
        try {
            let data = await UserModel.findByIdAndDelete(id)
            return { ok: true, data }
        } catch (error) {
            return { ok: false, error }
        }
    }
}

module.exports = new UserCTRL()