const User = require('../models/UserModel');
const sendToken = require('../utils/jwtToken');

// register a user -- PUBLIC
exports.registerUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.create({
            email,
            password,
            role,
        });
        sendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// login user -- PUBLIC
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered by user
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter email and password',
        });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password',
            });
        }
        sendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

