import jwt from "jsonwebtoken";

const generateTokenAndSetCookes = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn : '15d',
    })

    res.cookie("jwt",token,{
        maxAge:15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameScirpt : "strict",
        secure:process.env.NODE_ENV !== 'develepment'
    })
}

export default generateTokenAndSetCookes;
