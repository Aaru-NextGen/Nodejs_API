const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

dotEnv.config();

const app = express();

dbConnection()
app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/admin', require('./routes/admin'))

// Documentation
if (process.env.NODE_ENV != 'production') {
    console.log(swaggerDocument);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get('/', (req, res, next) => {
    res.send('Node server is running');
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});

app.use(function (err, req, res, next){
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
});