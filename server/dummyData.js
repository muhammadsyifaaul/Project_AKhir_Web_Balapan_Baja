const User = require("./Models/User")
const mongoose = require("mongoose");

const dummyUser = [
    {
        nama: "Admin Diskominfo",
        username: "admin@admin",
        password: "admin",
        role: "Admin OPD"
    },
    {
        nama: "Super Admin",
        username: "superadmin@admin",
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

const seedUsers = async () => {
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

seedUsers();
// const Penyedia = require("./Models/Penyedia");

// const dummyPenyedia = {
//     npwp: "1234567890",
//     nama: "Penyedia 1",
//     alamat: "Jalan Penyedia 1",
//     skp: 5
// }

// const seedData = async () => {
//     try {
//         await Penyedia.deleteMany();
//         await Penyedia.create(dummyPenyedia);
//         console.log("Data inserted successfully");
//         process.exit(0);
//     } catch (err) {
//         console.error("Error seeding data:", err);
//         process.exit(1);
//     }
// };

// seedData();
