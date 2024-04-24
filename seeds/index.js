const sequelize = require("../config/connection");
const {User,Tank,Fish} = require("../models")

const userSeeds = [
    {
        email:"joe@joe.joe",
        password:"password"
    },
    {
        email:"baShiva@joe.joe",
        password:"meowmeow"
    }
]

const tankSeeds = [
    {
        name:"my first salty",
        UserId:1
    },
    {
        name:"Freshy",
        UserId:1
    },
    {
        name:"For the cats",
        UserId:2
    }
]

const fishSeeds = [
    {
        name:"HDT",
        UserId:1,
        TankId:1,
        color:"#facade",
        width:125
    },
    {
        name:"Fish2",
        UserId:1,
        TankId:1,
        color:"#c0ffee",
        width:100
    },
    {
        name:"Fishy McFishFace",
        UserId:2,
        TankId:3,
        color:"brown",
        width:95
    }
]

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    const userData = await User.bulkCreate(userSeeds,{
        individualHooks:true
    })
    const tankData = await Tank.bulkCreate(tankSeeds)
    const fishData = await Fish.bulkCreate(fishSeeds)
   console.table(userData.map(item=>item.toJSON()));
   console.table(tankData.map(item=>item.toJSON()));
   console.table(fishData.map(item=>item.toJSON()));
   process.exit(0)
}

seedMe()