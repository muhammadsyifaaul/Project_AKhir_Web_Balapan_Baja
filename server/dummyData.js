const User = require("./Models/User")
const mongoose = require("mongoose");

const dummyUser = [
    {
        nama: "Super Admin",
        username: "superadmin@admin",
        password: "superadmin",
        role: "Super Admin"
    },
    {
        nama: "Admin Diskominfo",
        username: "admin@admin",
        password: "admin",
        role: "Admin OPD"
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
const Penyedia = require("./Models/Penyedia");
const Opd = require("./Models/Opd");
const TenagaAhli = require("./Models/TenagaAhli");

const dummyPenyedia = {
    npwp: "1234567890",
    nama: "Penyedia 1",
    alamat: "Jalan Penyedia 1",
    skp: 5
}
const dummyOpd = [
    {
        namaOpd: 'Dinas Pendidikan'
    },
    {
        namaOpd: 'Dinas Kesehatan'
    },
    {
        namaOpd: 'Dinas Pertanian'
    }
]
const dummyTenagaAhli = [
    {
        npwp: "377321783728347",
        nama: "Tenaga Ahli 1",
        alamat: "Jalan Tenaga Ahli 1"
    },
    {
        npwp: "377321783728347",
        nama: "Tenaga Ahli 2",
        alamat: "Jalan Tenaga Ahli 2"
    }
]
const seedData = async () => {
    try {
        await TenagaAhli.deleteMany();
        for (const tenagaAhli of dummyTenagaAhli) {
            await TenagaAhli.create(tenagaAhli);
        }

        console.log("Data inserted successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
};
const dummyPaket = [
    {
        opd: 'Dinas Pendidikan',
        namaPekerjaan: 'Pekerjaan 1',
        mulaiKontrak: new Date('2025-01-01'), 
        selesaiKontrak: new Date('2025-12-31'),
        nomorKontrak: 1,
        npwpPenyedia: "1234567890", 
        namaPenyedia: "Penyedia 1",
    },
    {
        opd: 'Dinas Kesehatan',
        namaPekerjaan: 'Pekerjaan 2',
        mulaiKontrak: new Date('2025-01-01'), 
        selesaiKontrak: new Date('2025-12-31'),
        nomorKontrak: 2,
        npwpPenyedia: "1234567890", 
        namaPenyedia: "Penyedia 1",
        nilaiKontrak: 210000000,
    }
];


// seedData();
