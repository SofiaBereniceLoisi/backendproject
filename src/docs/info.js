
export const info = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
            description: 'Documentacion de API para ecommerce',
        },
        servers: [
            {
                url: 'http://localhost:8080'
            },
            // {
            //     url: 'http://servidor en la nube'
            // }
        ]
    },
    apis: ['./src/docs/*.yml'],
};