const express=require("express");
const { json } = require("express/lib/response");
const mongoose=require("mongoose");
const app=express();
app.use(express.json())
const connect =()=>{
    return mongoose.connect("mongodb+srv://ayshasinata:A3011998.s@cluster0.4hbxb.mongodb.net/bank?retryWrites=true&w=majority")
}
const userSchema= new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String,required:false},
        lastName:{type:String,required:true},
        age:{type:Number,required:true},
        email: {type:String,required:true},
        address: {type:String,required:true},
        gender: {type:String,required:false,default:"Female"},
        type:{type:String,required:false,default:"customer"}

    },
    {   versionKey:false,
        timestamps:true
    }
)
const User=mongoose.model("user",userSchema);

const BranchDetailSchema= new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR :{type:Number,required:true}

    },
    {   versionKey:false,
        timestamps:true
    }
)
const BranchDetail=mongoose.model("branchDetail",BranchDetailSchema)

const SavingsAccountsSchema= new mongoose.Schema({
    account_number:{required:true,unique:true},
    balance:{required:true},
    interestRate: {required:true}
   
},

{versionKey:false,
    timeseries:true})
    const SavingsAccounts=mongoose.model("savingsAccount",SavingsAccountsSchema)

    const FixedAccountSchema=new mongoose.Schema({
        account_number:{required:true,unique:true},
        balance:{required:true},
        interestRate: {required},
        startDate:{required:true},
      maturityDate:{required:true},

    },{ versionKey:false,
        timestamps:true
    })
    const FixedAccount=mongoose.model("fixedAccount",FixedAccountSchema)

    const MasterAccount=new mongoose.Schema({
        balance:{type:mongoose.Schema(balance),ref:SavingsAccounts,required:true}+{type:mongoose.Schema(balance),ref:FixedAccountSchema,required:true}

    },{
        timestamps:true
    })


    app.listen(5000,async()=>{
        try{
    await connect();
        }catch(err){
console.log(err)
        }
        console.log("Listening on porst 5000")
    })