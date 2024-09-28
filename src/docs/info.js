
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
                url: 'http://localhost:8080',
                description: 'Local server'
            },
            {
                url: 'https://ecommercebackend-3q5e.onrender.com',
                description: 'Render server'
            }
        ]
    },
    apis: ['./src/docs/*.yml'],
};