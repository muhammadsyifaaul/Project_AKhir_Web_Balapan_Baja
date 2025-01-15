const User = require("./Models/User")
const mongoose = require("mongoose");

const dummyUser = [
    {
        email: "admin@admin",
        username: "admin",
        password: "admin",
        role: "Admin OPD"
    },
    {
        email: "superadmin@admin",
        username: "superadmin",
        password: "superadmin",
        role: "Super Admin"
    }
]

const connectDb = async () => {
    mongoose.connect('mongodb://localhost:27017/balapan_baja')
    .then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}
connectDb();

const seedData = async () => {
    try {
        await User.deleteMany();
        for (const user of dummyUser) {
            await User.create(user); 
        }

        console.log("Data inserted successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
};

seedData();
