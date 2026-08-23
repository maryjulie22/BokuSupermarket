const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    try {

    //request body
    const { name, email, password, gender, HasAdminAccess, phone, role } = req.body;

    if (!name || !email || !password || !gender || !phone || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
    }

    //check if phone number exists
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
        return res.status(400).json({ message: "User with this phone number already exists" });
    }

    //encrypt the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

//create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            HasAdminAccess: req.body.HasAdminAccess || false,
            phone: req.body.phone,
            role: req.body.role || 'user'
        });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

//create login function
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //gnerate a token 
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful",  token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};