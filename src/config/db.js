const config={
    host: process.env.LOCAL_HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT
}
console.log(config)
export default config