const userService = require("./userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password)=>{
    
    const user = await userService.getUserByEmail(email);
    if(!user) return {error : "User Not Found"};

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return {error : "Invalid password"};

    const token = jwt.sign(
        { id: user._id, email: user.email },     
        process.env.JWT_SECRET,                  
        { expiresIn: "1h" }                      
    );
    return {token};
}

module.exports = login;