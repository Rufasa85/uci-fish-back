const User = require("./User")
const Tank = require("./Tank")
const Fish = require("./Fish")

User.hasMany(Tank)
Tank.belongsTo(User,{
    onDelete:"CASCADE"
})

User.hasMany(Fish)
Fish.belongsTo(User,{
    onDelete:"CASCADE"
})

Tank.hasMany(Fish)
Fish.belongsTo(Tank,{
    onDelete:"CASCADE"
})

module.exports = {
    User,
    Tank,
    Fish,
}