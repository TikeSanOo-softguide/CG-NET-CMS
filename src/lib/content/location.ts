
import type { CoverageCity } from '@/types/coverage';

export const COVERAGE: CoverageCity[] = [
    {
        id: 1,
        name: {
        en: 'Yangon',
        my: 'ရန်ကုန်',
        zh: '仰光',
        },
        latt: 16.8409,
        long: 96.1735,
        regions: [
        {
            id: 1,
            name: {
            en: 'Downtown',
            my: 'အလယ်ပိုင်း',
            zh: '市中心',
            },
            latt: 16.7749,
            long: 96.158,
            areas: [
            {
                id: 1,
                name: { en: 'Latha', my: 'လသာ', zh: '拉达' },
                latt: 16.7753,
                long: 96.1503,
            },
            {
                id: 2,
                name: { en: 'Pabedan', my: 'ပန်းဘဲတန်း', zh: '巴贝丹' },
                latt: 16.7797,
                long: 96.1551,
            },
            {
                id: 3,
                name: { en: 'Kyauktada', my: 'ကျောက်တံတား', zh: '皎达' },
                latt: 16.7742,
                long: 96.1604,
            },
            ],
        },
        {
            id: 2,
            name: {
            en: 'East District',
            my: 'အရှေ့ပိုင်း',
            zh: '东区',
            },
            latt: 16.8256,
            long: 96.2212,
            areas: [
            {
                id: 4,
                name: { en: 'Thingangyun', my: 'သင်္ဃန်းကျွန်း', zh: '达贡' },
                latt: 16.8285,
                long: 96.1992,
            },
            {
                id: 5,
                name: { en: 'South Okkalapa', my: 'တောင်ဥက္ကလာပ', zh: '南奥卡拉帕' },
                latt: 16.8328,
                long: 96.1817,
            },
            ],
        },
        ],
    },
    {
        id: 2,
        name: {
        en: 'Mandalay',
        my: 'မန္တလေး',
        zh: '曼德勒',
        },
        latt: 21.9588,
        long: 96.0891,
        regions: [
        {
            id: 3,
            name: {
            en: 'Chanayethazan',
            my: 'ချမ်းအေးသာစံ',
            zh: '昌艾达赞',
            },
            latt: 21.9762,
            long: 96.0836,
            areas: [
            {
                id: 6,
                name: { en: 'Zegyo', my: 'ဈေးချို', zh: '泽乔' },
                latt: 21.9777,
                long: 96.0836,
            },
            {
                id: 7,
                name: { en: 'Maha Aungmyay', my: 'မဟာအောင်မြေ', zh: '马哈昂梅' },
                latt: 21.9744,
                long: 96.0982,
            },
            ],
        },
        {
            id: 4,
            name: {
            en: 'Aungmyaythazan',
            my: 'အောင်မြေသာစံ',
            zh: '昂梅达赞',
            },
            latt: 21.9636,
            long: 96.0946,
            areas: [
            {
                id: 8,
                name: { en: 'Pyigyitagon', my: 'ပြည်ကြီးတံခွန်', zh: '比基达贡' },
                latt: 21.9374,
                long: 96.0906,
            },
            ],
        },
        ],
    },
];
