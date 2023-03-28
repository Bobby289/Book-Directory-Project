const { genSaltSync,hashSync, compareSync } = require('bcrypt');
const { createUser,insertToken,addBook,getBook,getBookById,buyBook,depositBook,deleteBook,login } = require('../models.js')
const { sign } = require('jsonwebtoken');
const { nextTick } = require('process');
module.exports = {
    createUser : (req,res,next)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        createUser(body,(error,results)=>{
            if(error){
                console.log(error);
                return res.status(400).json({
                    status : 400,
                    message : "Please give sufficient details"
                });
            }
            next();
            // return res.json({
            //     status : 1,
            //     data : results
            // })
        });
    },
    tokenGen : (req,res)=>{
        const body= req.body;
        const temp = {
            user : body.name,
        }
        const jtoken = sign(temp,process.env.KEY,{expiresIn: "1h"});
        temp.token = jtoken;
        console.log(temp);
        insertToken(temp,(error,results)=>{
            if(error){
                console.log(error);
            }
        })
        return res.status(200).json({
            status : 200,
            message: "token successfully generated and is valid only for one hour",
            tokem : jtoken
        })

    },
    login : (req,res)=>{
        const body = req.body;
        login(body.name,(error,results)=>{
            if(error){
                console.log(error);
            }
            let result= compareSync(body.password,results.password);
            if(result){
                const temp={
                    name : body.name
                }
                const jtoken = sign(temp,process.env.KEY,{expiresIn: "1h"});
                return res.status(200).json({
                    status : 1,
                    message : "Login Successfully",
                    token : jtoken
                })
            }
        })
        
    },
    addBook : (req,res)=>{
        const body = req.body;
        addBook(body,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            return res.status(200).json({
                status : 1,
                message : ` ${body.count} ${body.name} books added successfully`
            })
        })
    },
    getBook : (req,res)=>{
        getBook((error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            return res.status(200).json({
                status : 1,
                data : results
            })
        })
    },
    getBookById : (req,res)=>{
        const id = req.params.id;
        getBookById(id,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            return res.status(200).json({
                status : 1,
                data : results
            })
        })
    },
    buyBook:(req,res)=>{
        const body = req.body;
        buyBook(body,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(304).json({
                    status : 304,
                    message : `Data is not modified`
                });
            }
            return res.status(200).json({
                status : 1,
                message : `you rented ${body.count} ${results.name} books from Directory`,
                data : results
            });
        })
    },
    depositBook:(req,res)=>{
        const body = req.body;
        depositBook(body,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(304).json({
                    status : 304,
                    message : `Data is not modified`
                });
            }
            return res.status(200).json({
                status : 200,
                message : `you deposited ${body.count} ${results.name} books`,
                data : results
            });
        })
    },
    deleteBook:(req,res)=>{
        const body=req.body;
        deleteBook(body.id,(error,results)=>{
            if(error){
                console.log(error);
                return;
            }
            return res.status(200).json({
                status : 200,
                message : "Deleted one book"
            })
        })
    }
}