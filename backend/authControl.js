import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ex from './models.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async(req, res)=>{
    const username = req.body.formvalue.username;
    const pwd = req.body.formvalue.password;
    const role = req.body.formvalue.role;
    try{
        {
        let user = null;
        const hashedPassword = await bcrypt.hash(pwd, 10);

        console.log(username,pwd,role)
        if(role === 'Patient')
        {
            await ex.models.Patient.findOne({username : username}).then((p)=>
            {
                if(p === null){
                    p = new ex.models.Patient({username : username, password : hashedPassword});
                    p.save();
                    res.send({message : 'OK'})
                }
            
                else
                {
                console.log(p);
                res.send("username exists");
                }
            }
        )}
        
        if(role === 'Doctor')
        {
            await ex.models.Doctor.findOne({username : username}).then((doc)=>
            {
                if(doc === null){
                    doc = new ex.models.Doctor({username : username, password : hashedPassword});
                    console.log(doc);
                    doc.save();
                    res.send({message : 'OK'})
                }
            
                else
                res.send("username exists");
            }
        )}

        if(role === 'Nurse')
            {
                await ex.models.Nurse.findOne({username : username}).then((n)=>
                {
                    if(n === null){
                        n = new ex.models.Nurse({username : username, password : hashedPassword});
                        console.log(n);
                        doc.save();
                        res.send({message : 'OK'})
                    }
                
                    else
                    res.send("username exists");
                }
            )}
        }
    }
    catch(err)
    {
        console.log("error while salting", err);
        res.send('Error while registering');
    }
}

export const login = async(req,res)=>{
    const username = req.body.formvalue.username;
    const pwd = req.body.formvalue.password;
    const role = req.body.role;
    try{
        if(role === 'Patient')
        {
            await ex.models.Patient.findOne({username : username}).then(async (user)=>{
                if(user == null)
                res.send({message : "user does not exist"});

                else
                {
                    if(user.password == pwd)
                    {
                        res.json({message : 'OK', data : {user : user, role : role}});
                    }
                    // if(await bcrypt.compare(pwd, user.password))
                    // {
                    //     const accessToken = jwt.sign(username, process.env.JWTSECRETKEY)
                    //     res.json({data : {accessToken : accessToken, user : user, role : role}});
                    // }
                
                    else
                    res.send({message : 'Not allowed'});
                }
            });
        }
        if(role === 'Doctor')
        {
            await ex.models.Doctor.findOne({username : username}).then(async (user)=>{
                if(user == null)
                res.send({message : "user does not exist"});

                else
                {
                    console.log(pwd)
                    // if(await bcrypt.compare(pwd, user.password))
                    // {
                    //     const accessToken = jwt.sign(username, process.env.JWTSECRETKEY)
                    //     console.log(accessToken)
                    //     res.json({data : {accessToken : accessToken, user : user, role : role}});
                    // }
                    if(user.password == pwd)
                    {
                        res.json({message : 'OK', data : {user : user, role : role}});
                    }
                
                    else
                    res.send({message : 'Not allowed'});
                }
            });
        }
        

    }
    catch(err)
    {
        console.log(err);
        res.send("Error while logging in");
    }
}

function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) res.send("no token")
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user)=>{

    if(err)
    res.send("no valid token")

    req.user = user
    next()
});
}

export const logout = async(req, res)=>{
        try{
            let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
            let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
        
            req.token = req.token + hashedRandomNumberToAppend;
            return res.status(200).json('logout');
        }catch(err){
            return res.status(500).json(err.message);
        }
}