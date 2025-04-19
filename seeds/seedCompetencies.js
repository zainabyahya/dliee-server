// seeds/seedCompetencies.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import models
const Area = require('../models/Area');
const Competency = require('../models/Competency');

// Define the 22 competencies with a reference to the area name
const competenciesData = [
    // Area: المشاركة المهنية
    {
        name: "التواصل الرقمي",
        description: "استخدام القنوات الرقمية للتواصل مع المتعلمين والزملاء بفعالية.",
        areaName: "المشاركة المهنية"
    },
    {
        name: "التعاون الرقمي",
        description: "العمل مع الزملاء والمتعلمين عبر الوسائل الرقمية لتحقيق أهداف مشتركة.",
        areaName: "المشاركة المهنية"
    },
    {
        name: "التطوير المهني الرقمي",
        description: "استخدام التقنيات الرقمية لتعزيز التطوير المهني وبناء الشبكات.",
        areaName: "المشاركة المهنية"
    },

    // Area: الموارد الرقمية
    {
        name: "البحث عن الموارد الرقمية",
        description: "تحديد واختيار الموارد الرقمية المناسبة لتعزيز العملية التعليمية.",
        areaName: "الموارد الرقمية"
    },
    {
        name: "إنشاء الموارد الرقمية",
        description: "تصميم وإنشاء محتوى رقمي يدعم وتيرة التعلم.",
        areaName: "الموارد الرقمية"
    },
    {
        name: "تعديل وإعادة استخدام الموارد الرقمية",
        description: "تعديل الموارد الرقمية الموجودة لتناسب احتياجات التدريس وإعادة استخدامها.",
        areaName: "الموارد الرقمية"
    },
    {
        name: "مشاركة الموارد الرقمية",
        description: "نشر وتبادل الموارد الرقمية مع زملاء التدريس والمجتمع التعليمي.",
        areaName: "الموارد الرقمية"
    },

    // Area: التدريس والتعلم
    {
        name: "تصميم بيئات التعلم الرقمية",
        description: "إنشاء وتخطيط بيئات تعليمية رقمية داعمة للتعلم الفعال.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "تنفيذ استراتيجيات تدريس رقمية مبتكرة",
        description: "استخدام أساليب تدريس رقمية حديثة لتعزيز التفاعل والتعلم.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "إدارة عمليات التعلم الرقمي",
        description: "تنظيم ومراقبة عمليات التعلم باستخدام تقنيات رقمية لضمان جودة العملية التعليمية.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "تسهيل التواصل والتفاعل في التعليم الرقمي",
        description: "دعم وتيسير التفاعل والتواصل بين المعلمين والطلاب عبر المنصات الرقمية.",
        areaName: "التدريس والتعلم"
    },

    // Area: التقييم
    {
        name: "تصميم التقييم الرقمي",
        description: "ابتكار وتصميم أدوات تقييم رقمية فعالة لقياس تقدم التعلم.",
        areaName: "التقييم"
    },
    {
        name: "استخدام التقنيات الرقمية للمراقبة والتغذية الراجعة",
        description: "توظيف الأدوات الرقمية لمتابعة تقدم الطلاب وتقديم التغذية الراجعة البناءة.",
        areaName: "التقييم"
    },
    {
        name: "تحليل بيانات التعلم الرقمية",
        description: "استخدام البيانات الرقمية لتحليل أداء المتعلمين وتحسين الاستراتيجيات التعليمية.",
        areaName: "التقييم"
    },

    // Area: تمكين المتعلمين
    {
        name: "تخصيص التعلم الرقمي",
        description: "تصميم تجارب تعلم رقمية مخصصة لتلبية احتياجات المتعلمين الفردية.",
        areaName: "تمكين المتعلمين"
    },
    {
        name: "تشجيع استقلالية المتعلمين",
        description: "تشجيع المتعلمين على تحمل مسؤولية تعلمهم من خلال أدوات رقمية تفاعلية.",
        areaName: "تمكين المتعلمين"
    },
    {
        name: "دعم المتعلمين باستخدام التقنيات الرقمية",
        description: "توفير الدعم اللازم للمتعلمين باستخدام الأدوات الرقمية الملائمة.",
        areaName: "تمكين المتعلمين"
    },
    {
        name: "إشراك المتعلمين في التعلم النشط",
        description: "تعزيز مشاركة المتعلمين من خلال أنشطة تعلم رقمية تفاعلية ومحفزة.",
        areaName: "تمكين المتعلمين"
    },

    // Area: تسهيل تطوير الكفاءة الرقمية للمتعلمين
    {
        name: "توجيه المتعلمين في تقييم مصداقية المعلومات الرقمية",
        description: "تعليم المتعلمين كيفية تقييم مصداقية وجودة المعلومات التي يستقونها رقمياً.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "تسهيل التعلم التعاوني الرقمي",
        description: "تيسير بيئة التعلم التعاوني باستخدام الأدوات والتقنيات الرقمية.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "تمكين المتعلمين للابتكار الرقمي",
        description: "تشجيع وإدارة الابتكار الرقمي بين المتعلمين عبر استخدام التقنيات الإبداعية.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "خلق بيئات تعلم رقمية شاملة",
        description: "تصميم بيئات تعليمية رقمية تراعي احتياجات جميع المتعلمين لضمان شمولية التعليم.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    }
];

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        // Prepare competency documents by finding the matching area for each competency
        const competenciesToInsert = [];
        for (let comp of competenciesData) {
            // Look for the area by its Arabic name
            const area = await Area.findOne({ name: comp.areaName });
            if (!area) {
                console.error(`Area not found: ${comp.areaName}`);
                continue; // Skip this competency if area is not found
            }
            competenciesToInsert.push({
                name: comp.name,
                description: comp.description,
                area: area._id
            });
        }

        // Check if competencies already exist
        const count = await Competency.countDocuments();
        if (count > 0) {
            console.log("Competencies already exist. Exiting seeder.");
            process.exit(0);
        }

        // Insert competencies
        const insertedCompetencies = await Competency.insertMany(competenciesToInsert);
        console.log("Seeded competencies successfully:", insertedCompetencies);
        process.exit(0);
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    });
