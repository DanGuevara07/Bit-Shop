import  Express  from "express";

export const createUser = (req: Express.Request,res: Express.Response):Express.Response => {
    return res.status(201).json({msg:"usuario creado"})
}

export const login = (req: Express.Request,res: Express.Response) => {
    const DB = [
        {
            username : "Michael",
            password : "compaq"
        },
        {
            username : "Stephany",
            password : "compaq"
        },
        {
            username : "Carlos",
            password : "compaq"
        },
        {
            username : "Aida",
            password : "compaq"
        },

    ]
    try {
        let {username, password} = req.body;//{username: "usuario", password :"password"}

        for(let user of DB){
            if(username === user.username){
                if(password === user.password){
                    return res.status(200).json({status: "Login Succeded!!"})
                }else{

                }

            }
        }
        return res.status(401).json({msg: "Credentials are rejected!!"})
        
    } catch (error) {
        console.log(error)
    }
    


}

export default createUser