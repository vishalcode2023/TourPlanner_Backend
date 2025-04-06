const { User, validateUser } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const createJwt  =  require('../Config/JWTConfig');
const { sendWelcomeEmail, LoginBackEmail } = require('../Config/NodemailerConfig');

module.exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  // Validate the user input
  const { error } = validateUser({
    username,
    email,
    password,
  });

  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if the user already exists
    const exisitinguser = await User.findOne({ email });
    if (exisitinguser)
      return res.status(400).send("User already exists with this email");

    // Hash the password
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedpassword,
    });

    // Generate a JWT token
    const token = await createJwt({ id: user._id, email: user.email });

    await sendWelcomeEmail(user.email, user.username); // Send welcome email

    await user.save();
    
    res.status(200).json({
      message: "User registered successfully",
      user,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports.login = async(req,res) => {
    const {email,password} = req.body;

    // Validate the user input
    const { error } = validateUser({ email, password });
    if (error) return res.status(400).send(error.details[0].message);

    try {
    
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send("Invalid email or password");

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid email or password");

      // Generate a JWT token
      const token = await createJwt({ id: user._id, email: user.email });

      await LoginBackEmail(user.email, user.username); // Send login email

      res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}


module.exports.logout = async(req,res) => {
    try {
        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}