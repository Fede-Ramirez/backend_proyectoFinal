const express = require('express');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const config = require('../config/config');
const { signUpFunction, loginFunction } = require('./auth');
const mainRouter = require('../routes');
const logger = require('./log4jsConfig');
const { MessageController } = require('../controllers');
const http = require('http');
const path = require('path');
const { information } = require('../docs/information');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const server = new http.Server(app);

app.use(express.json());

//Configuración para la documentación

const specs = swaggerJSDoc(information);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
//Configuración de las sesiones

const ttlSeconds = 1800;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: config.SESSION_SECRET_KEY,
        },
    }),
    secret: config.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

app.use('/api', mainRouter);

//Configuración para renderizado front-end

const publicPath = path.resolve(__dirname, '../../public');
const viewsPath = path.resolve(__dirname, '../../views');

app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.set('views', viewsPath );

app.get('/chat',async (req, res, next) =>{
    try{
        //const products = await getAllProducts();
        const messages = await MessageController.getMessages();
        res.render(/*'formulario'*/ 'chat', {/*products,*/ messages});
    }catch (err){
        next(err);
    };
});

//Middleware para rutas no implementadas

app.use((req, res, next) => {
    return res.status(404).json({
        error: -2,
        description: `Lo sentimos, no es posible procesar su solicitud porque la ruta ${req.url} no existe en nuestro sistema`,
    });
});

//Middleware general

app.use(function (err, req, res, next) {
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack = err.stack;
    logger.error(err);
    res.status(status).send({ 
        msg, stack 
    });
});

module.exports = server;