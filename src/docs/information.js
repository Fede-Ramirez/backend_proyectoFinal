const information = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Proyecto Final - Programación Backend - ecommerce',
            version: '1.0.0',
            description: 'Aplicación ecommerce Backend para venta de productos'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            },
            // {
            //     url: 'https://railway.app/myapp'
            // }
        ]
    },
    apis: ['./src/docs/*.yml']
};

module.exports = { information };