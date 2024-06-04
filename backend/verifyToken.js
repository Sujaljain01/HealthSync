import jwt from 'jsonwebtoken';
import ex from './models.js';

export const authenticate = async(req,res,next)=>{
    //get token
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer "))
    {
        return res.send({message : "No token, authorization denied"});
    }

    try{
        const token = authToken.split(" ")[1].trim();
        // const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
            if (err) {
                console.error('Error verifying JWT token:');
                // Handle the error here, such as sending an error response
            } else {
                // Token is successfully verified, proceed with decoded information
                console.log('JWT token decoded:', decoded);
                req.user = {
                    username : decoded
                };
                console.log("token verified");
                next();
                // You can use the decoded information as needed
            }
        });
        

        // req.user = {
        //     userId: decoded._id,
        //     role: decoded.role
        // };
        // console.log("token verified");
        // next();
    }
    catch(err)
    {
        console.log(err);
        res.send({message : err});
    }
}

export const restrict = roles => async(req,res,next)=>{
    const userId = req.params.id;
    console.log("id",userId)
    let user = null;
    
    await ex.models.Patient.findById(userId).then((patient)=>{
        if(patient != null)
        user = patient
    });

    await ex.models.Doctor.findById(userId).then((doctor)=>{
        if(doctor != null)
        user = doctor;
    });
console.log(user)
if(!roles.includes(user.role))
return res("Not authorised");

next();

    
}