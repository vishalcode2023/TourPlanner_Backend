const jwt = require("jsonwebtoken");


const createJwt = async(data) => {
    try {
        return jwt.sign(data,process.env.JWT_SECRET,{
            expiresIn: '8h',
        })
    } catch (error) {
        console.error('Error creating JWT:', error.message);
    }
} 

module.exports = createJwt;