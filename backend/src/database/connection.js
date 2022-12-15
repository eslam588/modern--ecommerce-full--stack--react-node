const mongoose = require('mongoose'); 
mongoose.connect(process.env.DBNAME,{useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    console.log("successful DB connection");
})
.catch((err) => {
    console.log(err);
});