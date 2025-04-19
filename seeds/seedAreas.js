// seeds/seedAreas.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import your Area model
const Area = require('../models/Area');

// Define the DigCompEdu areas
const areasData = [
    {
        name: "المشاركة المهنية",
        description: "استخدام التقنيات الرقمية لتعزيز الاتصالات والتواصل المهني وتطوير الذات."
    },
    {
        name: "الموارد الرقمية",
        description: "البحث، والإنشاء، والتعديل، والمشاركة في الموارد الرقمية لتدعيم العملية التعليمية."
    },
    {
        name: "التدريس والتعلم",
        description: "تصميم وتخطيط وتنفيذ استراتيجيات التدريس والتعلم باستخدام التقنيات الرقمية لتعزيز التفاعل وتسهيل الفهم."
    },
    {
        name: "التقييم",
        description: "استخدام الأدوات الرقمية لمراقبة وتقييم أداء المعلمين والطلاب وتقديم التغذية الراجعة المناسبة."
    },
    {
        name: "تمكين المتعلمين",
        description: "استخدام التقنيات الرقمية لتحفيز المتعلمين ودعمهم في التعلم الذاتي والمستقل."
    },
    {
        name: "تسهيل تطوير الكفاءة الرقمية للمتعلمين",
        description: "دعم المتعلمين في تطوير وإدارة وتقييم مهاراتهم الرقمية لتعزيز مشاركتهم الفعالة في العملية التعليمية."
    }
];

// Connect to MongoDB
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        // Check if any areas already exist
        const count = await Area.countDocuments();
        if (count > 0) {
            console.log("Areas already exist in the database. Exiting.");
            process.exit(0);
        }

        // Insert the areas
        const insertedAreas = await Area.insertMany(areasData);
        console.log("Seeded the following areas:", insertedAreas);
        process.exit(0);
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    });
