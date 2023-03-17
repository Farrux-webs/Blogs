const { env } = process;

const envConfig ={
    PORT: env.PORT,
    JWT_SECRET_KEY: env.SECRET_KEY
}

module.exports = envConfig