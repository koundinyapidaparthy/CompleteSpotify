const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/spotify",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
.then(()=>{console.log("dbs creation successfull")})
.catch((e)=>{console.log(e)})