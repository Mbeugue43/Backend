const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role, adminDetails } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            fullName,
            email,
            password: hashedPassword,
            role: role || 'Patient',
            statut: 'ACTIF'
        };

        // ✅ ADMIN : adminDetails OBLIGATOIRE
        if (role === 'Admin') {
            userData.adminDetails = {
                adminCode: adminDetails?.adminCode || 'ADMIN-001',
                permissions: adminDetails?.permissions || ['all', 'users', 'services']
            };
        }

        const newUser = await User.create(userData);

        const token = generateToken(newUser);

        const userResponse = {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role
        };

        return res.status(201).json({ 
            message: "User registered successfully", 
            user: userResponse,
            token
        });
    } catch (error) {
        console.log("❌ REGISTER ERROR:", error.message);
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        return res.status(200).json({ 
            message: "Login successful", 
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                fullName: user.fullName
            }
        });
    } catch (error) {
        console.log("❌ LOGIN ERROR:", error);
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports = {
    registerUser,
    loginUser
}
