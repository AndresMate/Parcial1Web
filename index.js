
const express = require('express');
const app = express();
const path = require('path');

//setters
app.use(express.static(path.join(__dirname,'public')));
app.set('PORT',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/',require('./routes/index'));

app.listen(app.get('PORT'), () => {
    console.log(`Server is ready at http://localhost:${app.get('PORT')} in ${app.get('env')} mode`);
});
