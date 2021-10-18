//Параметры для подключения к базе данных
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin123",
    DB: "todoDatabase",
    dialect: "postgres",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}