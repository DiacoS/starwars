const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const characterRoutes = require('./src/routes/characters');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(characterRoutes);


app.get('/', (req, res) => {
    res.send('Dette er vores Star Wars type shit');
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json("noget gik galt");
});
app.use((req, res, next) => {
    res.status(500).json({message: "noget gik galt"});
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

module.exports = app;
