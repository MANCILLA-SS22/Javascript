import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function handleLogin (req, res){
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    
    const match = await bcrypt.compare(pwd, foundUser.password); // evaluate password 
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const objUser = {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            }
        const accessToken = jwt.sign(objUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' }); // create JWTs
        const newRefreshToken = jwt.sign( { "username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15s' } );
        
        let newRefreshTokenArray =!cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt); // Changed to let keyword

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

export { handleLogin };