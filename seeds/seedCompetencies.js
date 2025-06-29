const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import models
const Area = require('../models/Area');
const Competency = require('../models/Competency');

// Define the 22 competencies with a reference to the area name
const competenciesData = [
    // Area: المشاركة المهنية (Professional Engagement)
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
        name: "الممارسة التأملية",
        description: "تحليل وتقييم الممارسات التعليمية لتحسين الأداء المستقبلي باستخدام الأدوات الرقمية.",
        areaName: "المشاركة المهنية"
    },
    {
        name: "التطوير المهني الرقمي",
        description: "استخدام التقنيات الرقمية لتعزيز التطوير المهني وبناء الشبكات.",
        areaName: "المشاركة المهنية"
    },

    // Area: الموارد الرقمية (Digital Resources)
    {
        name: "اختيار الموارد الرقمية",
        description: "تحديد واختيار الموارد الرقمية المناسبة لتعزيز العملية التعليمية.",
        areaName: "الموارد الرقمية"
    },
    {
        name: "إنشاء وتعديل الموارد الرقمية",
        description: "تصميم وإنشاء وتعديل محتوى رقمي يدعم وتيرة التعلم.",
        areaName: "الموارد الرقمية"
    },
    {
        name: "إدارة ومشاركة الموارد الرقمية",
        description: "إدارة الموارد الرقمية ومشاركتها مع الزملاء وحمايتها بفعالية.",
        areaName: "الموارد الرقمية"
    },

    // Area: التدريس والتعلم (Teaching and Learning)
    {
        name: "التدريس باستخدام التقنيات الرقمية",
        description: "استخدام استراتيجيات تدريس رقمية لدعم العملية التعليمية.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "تقديم التوجيه والدعم",
        description: "مرافقة المتعلمين خلال رحلتهم الرقمية وتقديم الإرشاد المناسب.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "تعزيز التعلم التعاوني",
        description: "دعم التعاون بين المتعلمين باستخدام أدوات وتقنيات رقمية.",
        areaName: "التدريس والتعلم"
    },
    {
        name: "تعزيز التعلم الذاتي التنظيم",
        description: "تمكين المتعلمين من تنظيم تعلمهم باستخدام حلول رقمية.",
        areaName: "التدريس والتعلم"
    },

    // Area: التقييم (Assessment)
    {
        name: "استراتيجيات التقييم الرقمي",
        description: "ابتكار وتصميم أدوات تقييم رقمية فعالة لقياس تقدم التعلم.",
        areaName: "التقييم"
    },
    {
        name: "تحليل الأدلة الرقمية",
        description: "تحليل نتائج التقييمات الرقمية لتوجيه العملية التعليمية.",
        areaName: "التقييم"
    },
    {
        name: "التغذية الراجعة والتخطيط",
        description: "استخدام البيانات لتقديم تغذية راجعة بناءة وتحسين التخطيط.",
        areaName: "التقييم"
    },

    // Area: تمكين المتعلمين (Empowering Learners)
    {
        name: "إتاحة الوصول والشمول",
        description: "توفير بيئات تعليمية رقمية تراعي جميع احتياجات المتعلمين.",
        areaName: "تمكين المتعلمين"
    },
    {
        name: "التفريد والتخصيص",
        description: "تصميم أنشطة تعلم رقمية مخصصة تلائم أنماط المتعلمين.",
        areaName: "تمكين المتعلمين"
    },
    {
        name: "إشراك المتعلمين بفعالية",
        description: "تشجيع المتعلمين على المشاركة الفاعلة باستخدام تقنيات رقمية محفزة.",
        areaName: "تمكين المتعلمين"
    },

    // Area: تسهيل تطوير الكفاءة الرقمية للمتعلمين (Facilitating Learners' Digital Competence)
    {
        name: "التربية الإعلامية والمعلوماتية",
        description: "تعليم المتعلمين كيفية تقييم مصداقية المعلومات الرقمية.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "تعليم التواصل الرقمي الفعال",
        description: "تمكين المتعلمين من استخدام الوسائط الرقمية للتواصل والتعاون بفعالية.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "إنشاء المحتوى الرقمي",
        description: "تمكين المتعلمين من إنتاج وتعديل محتوى رقمي خاص بهم.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "تعزيز الاستخدام المسؤول للتكنولوجيا",
        description: "تعليم الطلاب كيفية استخدام التكنولوجيا بشكل آمن وأخلاقي ومسؤول.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    },
    {
        name: "تنمية مهارات حل المشكلات الرقمية",
        description: "تشجيع التفكير النقدي وحل المشكلات باستخدام الأدوات الرقمية.",
        areaName: "تسهيل تطوير الكفاءة الرقمية للمتعلمين"
    }
];

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        const competenciesToInsert = [];

        await Competency.deleteMany({});
        console.log("✅ Existing competencies cleared.");

        for (let comp of competenciesData) {
            const area = await Area.findOne({ name: comp.areaName });
            if (!area) {
                console.error(`❌ Area not found: ${comp.areaName}`);
                continue;
            }
            competenciesToInsert.push({
                name: comp.name,
                description: comp.description,
                area: area._id
            });
        }

        const count = await Competency.countDocuments();
        if (count > 0) {
            console.log("Competencies already exist. Exiting seeder.");
            process.exit(0);
        }

        const insertedCompetencies = await Competency.insertMany(competenciesToInsert);
        console.log("✅ Seeded competencies successfully:", insertedCompetencies.length);
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ Error connecting to MongoDB", err);
        process.exit(1);
    });
