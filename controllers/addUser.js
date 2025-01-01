import User from "../models/userSchema.js";

const handleAddUser = async (req, res) => {
    const { id, email, firstName, lastName, profileImage} = req.body;
    
    try {
        const existingUser = await User.findOne({ clerkId: id })
        if(existingUser){
            res.status(200).json({ message: "User already exists "});
            return;
        }

        const newUser = new User({
            clerkId: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage
        })
        await newUser.save();

        res.status(200).json({ message: "User added successfully "});
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error "});
        return;
    }
}

export default handleAddUser