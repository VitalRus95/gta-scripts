import { AltMenu } from "../../altMenu[mem]";
import { plc } from "../sharedConstants";

// Interfaces
interface Location {
    name?: string;
    pos: [float, float, float];
    heading: float;
    interior?: int;
}

interface Area {
    locations: Location[];
    name: string;
    description?: string;
    menu?: AltMenu;
}

// Variables
let LS: Area = {
    locations: [
        { name: "#CHC", pos: [2210.4, -1108.7, 26.11], heading: 197.65 },
        { name: "#EBE", pos: [2652.83, -1645.69, 10.87], heading: 237.26 },
        { name: "#EBE", pos: [2858.01, -1181.24, 24.7], heading: 56.1 },
        { name: "#ELCO", pos: [1833.14, -1885.2, 13.42], heading: 64.02 },
        { name: "#GAN", pos: [2489.49, -1666.6, 13.34], heading: 207.35 },
        { name: "#JEF", pos: [2239.95, -1260.8, 23.94], heading: 269.85 },
        { name: "#LAIR", pos: [1585.23, -2443.75, 13.55], heading: 141.54 },
        { name: "#LDOC", pos: [2498.45, -2486.68, 13.64], heading: 249.84 },
        { name: "#LDOC", pos: [2781.65, -2399.92, 13.64], heading: 284.91 },
        { name: "#LDT", pos: [1535.6, -1363.82, 329.46], heading: 36.71 },
        { name: "#LIND", pos: [2406.5, -1907.0, 13.55], heading: 350.51 },
        { name: "#LIND", pos: [2651.91, -2009.87, 13.55], heading: 268.2 },
        { name: "#MAR", pos: [764.52, -1593.7, 13.55], heading: 103.5 },
        { name: "#ROD", pos: [456.17, -1295.85, 15.3], heading: 237.59 },
        { name: "#SMB", pos: [150.6, -1764.56, 4.69], heading: 182.51 },
        { name: "#VERO", pos: [724.86, -1846.77, 12.06], heading: 136.79 },
        { name: "#VIN", pos: [770.86, -1147.88, 23.12], heading: 205.65 },
    ],
    name: "#LA",
};

let SF: Area = {
    locations: [
        { name: "#BATTP", pos: [-2599.0, 1380.63, 7.14], heading: 27.48 },
        { name: "#BAYV", pos: [-2819.85, 1117.64, 28.61], heading: 164.86 },
        { name: "#CITYS", pos: [-2708.61, 394.9, 4.37], heading: 201.16 },
        { name: "#CIVI", pos: [-2688.41, 576.48, 14.74], heading: 269.44 },
        { name: "#CRANB", pos: [-1997.29, 119.29, 27.69], heading: 13.51 },
        { name: "#CUNTC", pos: [-2290.74, -246.86, 42.96], heading: 344.53 },
        { name: "#CUNTC", pos: [-2684.63, -255.34, 7.03], heading: 143.61 },
        { name: "#DOH", pos: [-1997.02, -84.0, 35.44], heading: 50.13 },
        { name: "#EASB", pos: [-1538.04, 513.94, 7.18], heading: 246.55 },
        { name: "#EASB", pos: [-1640.93, 545.04, 39.02], heading: 316.49 },
        { name: "#EASB", pos: [-1727.95, 30.69, 3.55], heading: 321.47 },
        { name: "#ESPN", pos: [-1642.66, 1310.94, 7.18], heading: 111.27 },
        { name: "#FINA", pos: [-1753.62, 885.38, 295.88], heading: 286.46 },
        { name: "#HILLP", pos: [-2453.57, -607.62, 132.54], heading: 130.03 },
        { name: "#PARA", pos: [-2662.48, 1233.21, 55.58], heading: 8.77 },
        { name: "#SFAIR", pos: [-1299.07, -615.38, 14.15], heading: 354.06 },
        { name: "#SFDWT", pos: [-1510.12, 924.5, 7.19], heading: 2.89 },
    ],
    name: "#SF",
};

let LV: Area = {
    locations: [
        { name: "#CALI", pos: [2153.38, 1656.19, 10.82], heading: 317.74 },
        { name: "#GGC", pos: [1135.46, 1113.62, 11.0], heading: 144.65 },
        { name: "#ISLE", pos: [2086.23, 2318.42, 10.82], heading: 311.06 },
        { name: "#LINDEN", pos: [2858.59, 1298.4, 11.39], heading: 202.03 },
        { name: "#OVS", pos: [2334.79, 2127.08, 10.82], heading: 295.75 },
        { name: "#PRP", pos: [1765.26, 2742.49, 10.84], heading: 353.72 },
        { name: "#REDW", pos: [1558.19, 2180.63, 10.82], heading: 4.65 },
        { name: "#ROCE", pos: [2316.5, 2402.97, 10.82], heading: 45.95 },
        { name: "#ROCE", pos: [2623.07, 2213.91, 10.82], heading: 6.92 },
        { name: "#ROY", pos: [2198.64, 1426.59, 10.82], heading: 67.9 },
        { name: "#SPIN", pos: [2408.93, 2709.98, 10.82], heading: 290.39 },
        { name: "#STAR", pos: [2365.51, 1958.96, 10.82], heading: 3.87 },
        { name: "#STRIP", pos: [2030.83, 990.26, 10.81], heading: 357.35 },
        { name: "#STRIP", pos: [2081.54, 1224.24, 10.82], heading: 281.27 },
        { name: "#STRIP", pos: [2115.05, 1765.58, 10.82], heading: 314.68 },
        { name: "#VAIR", pos: [1301.91, 1289.64, 10.82], heading: 330.77 },
        { name: "#VISA", pos: [2085.4, 1957.98, 11.33], heading: 124.83 },
        { name: "#YBELL", pos: [1520.88, 2766.32, 10.82], heading: 81.8 },
    ],
    name: "#VE",
};

let other: Area = {
    locations: [
        { name: "#ANGPI", pos: [-2202.13, -2370.1, 30.62], heading: 249.77 },
        { name: "#BARRA", pos: [-857.5, 1560.63, 24.3], heading: 201.36 },
        { name: "#BFLD", pos: [1093.93, 1381.03, 10.82], heading: 348.91 },
        { name: "#BIGE", pos: [-285.38, 1511.4, 75.56], heading: 25.07 },
        { name: "#BLUEB", pos: [146.51, -86.03, 1.58], heading: 64.02 },
        { name: "#CARSO", pos: [-153.54, 1088.72, 19.74], heading: 59.73 },
        { name: "#DAM", pos: [-820.39, 1931.98, 7.0], heading: 308.59 },
        { name: "#DAM", pos: [-898.41, 1997.73, 60.91], heading: 296.0 },
        { name: "#DILLI", pos: [651.15, -589.9, 16.34], heading: 21.29 },
        { name: "#ELQUE", pos: [-1472.31, 2683.57, 55.84], heading: 183.15 },
        { name: "#MEAD", pos: [430.39, 2522.37, 16.48], heading: 98.09 },
        { name: "#MONT", pos: [1323.46, 345.12, 19.55], heading: 192.44 },
        { name: "#MTCHI", pos: [-2235.75, -1734.3, 480.82], heading: 251.73 },
        { name: "#PALO", pos: [2278.68, 99.59, 26.48], heading: 236.53 },
        { name: "#PAYAS", pos: [-293.93, 2614.06, 63.26], heading: 294.3 },
        { name: "#REST", pos: [355.26, 1779.04, 17.23], heading: 44.66 },
        { name: "#SUNNN", pos: [-2473.65, 2345.59, 5.5], heading: 239.51 },
        { name: "#TOM", pos: [-302.74, 1854.2, 42.29], heading: 75.2 },
    ],
    name: "#FED_BL4",
};

let interiors: Area = {
    locations: [
        {
            name: "#8TRACK",
            pos: [-1266.59, -216.344, 1049.73],
            heading: 122.909,
            interior: 7,
        },
        {
            name: "#ABATOIR",
            pos: [964.377, 2157.33, 1010.02],
            heading: 180,
            interior: 1,
        },
        {
            name: "#AMMUN1",
            pos: [286.149, -40.6444, 1000.57],
            heading: -0.100006,
            interior: 1,
        },
        {
            name: "#AMMUN2",
            pos: [285.801, -83.5476, 1000.54],
            heading: -0.100006,
            interior: 4,
        },
        {
            name: "#AMMUN3",
            pos: [296.92, -110.072, 1000.57],
            heading: -0.100006,
            interior: 6,
        },
        {
            name: "#AMMUN4",
            pos: [315.821, -141.432, 998.662],
            heading: -0.100006,
            interior: 7,
        },
        {
            name: "#AMMUN5",
            pos: [316.525, -167.707, 998.662],
            heading: -0.100006,
            interior: 6,
        },
        {
            name: "#ATRIUME",
            pos: [1726.18, -1641.01, 19.2676],
            heading: 180,
            interior: 18,
        },
        {
            name: "#BAR1",
            pos: [493.391, -22.7228, 999.687],
            heading: 0,
            interior: 17,
        },
        {
            name: "#BAR2",
            pos: [501.981, -69.1502, 997.835],
            heading: 180,
            interior: 11,
        },
        {
            name: "#BARBER2",
            pos: [418.653, -82.6398, 1000.96],
            heading: 0,
            interior: 3,
        },
        {
            name: "#BARBER3",
            pos: [412.022, -52.6499, 1000.96],
            heading: 0,
            interior: 12,
        },
        {
            name: "#BARBERS",
            pos: [411.626, -21.4333, 1000.8],
            heading: 0,
            interior: 2,
        },
        {
            name: "#BDUPS",
            pos: [1527.23, -11.5745, 1001.27],
            heading: 0,
            interior: 3,
        },
        {
            name: "#BDUPS1",
            pos: [1523.51, -47.8212, 1001.27],
            heading: 0,
            interior: 2,
        },
        {
            name: "#BIKESCH",
            pos: [1494.43, 1305.63, 1092.29],
            heading: 360,
            interior: 3,
        },
        {
            name: "#BROTHEL",
            pos: [744.543, 1436.67, 1101.74],
            heading: -0.834778,
            interior: 6,
        },
        {
            name: "#BROTHL2",
            pos: [942.17, -16.007, 1000.18],
            heading: 0,
            interior: 3,
        },
        {
            name: "#BROTHL2",
            pos: [964.107, -53.2055, 1000.18],
            heading: 90,
            interior: 3,
        },
        {
            name: "#BURHOUS",
            pos: [2807.62, -1171.9, 1024.58],
            heading: 0,
            interior: 8,
        },
        {
            name: "#CARLS",
            pos: [2496.05, -1693.93, 1013.75],
            heading: -180,
            interior: 3,
        },
        {
            name: "#CARTER",
            pos: [2543.66, -1303.63, 1024.07],
            heading: 180,
            interior: 2,
        },
        {
            name: "#CASINO2",
            pos: [1133.07, -9.57306, 999.75],
            heading: 0,
            interior: 12,
        },
        {
            name: "#CHANGER",
            pos: [255.137, -41.5322, 1001.07],
            heading: -90,
            interior: 14,
        },
        {
            name: "#CLOTHGP",
            pos: [161.391, -94.2856, 1000.81],
            heading: 0,
            interior: 18,
        },
        {
            name: "#CSCHP",
            pos: [207.738, -109.02, 1004.27],
            heading: 0,
            interior: 15,
        },
        {
            name: "#CSDESGN",
            pos: [226.294, -7.43153, 1001.26],
            heading: 90,
            interior: 5,
        },
        {
            name: "#CSEXL",
            pos: [204.333, -166.695, 999.579],
            heading: 0,
            interior: 14,
        },
        {
            name: "#CSSPRT",
            pos: [207.055, -138.805, 1002.52],
            heading: 0,
            interior: 3,
        },
        {
            name: "#DINER1",
            pos: [458.1, -88.4285, 998.622],
            heading: 90,
            interior: 4,
        },
        {
            name: "#DINER2",
            pos: [459.351, -110.105, 998.718],
            heading: 0,
            interior: 5,
        },
        {
            name: "#DIRBIKE",
            pos: [-1320.94, -602.382, 1055.22],
            heading: 122.909,
            interior: 4,
        },
        {
            name: "#DRIVES",
            pos: [-2029.72, -118.068, 1034.17],
            heading: 0,
            interior: 3,
        },
        {
            name: "#FDBURG",
            pos: [364.913, -73.5787, 1000.55],
            heading: -45.3,
            interior: 10,
        },
        {
            name: "#FDCHICK",
            pos: [365.673, -10.7132, 1000.87],
            heading: -0.100006,
            interior: 9,
        },
        {
            name: "#FDDONUT",
            pos: [377.099, -192.44, 999.644],
            heading: -0.100006,
            interior: 17,
        },
        {
            name: "#FDPIZA",
            pos: [372.352, -131.651, 1000.45],
            heading: -0.100006,
            interior: 5,
        },
        {
            name: "#FDREST1",
            pos: [450.49, -18.1797, 1000.18],
            heading: 90,
            interior: 1,
        },
        {
            name: "#GANG",
            pos: [2350.34, -1181.65, 1027],
            heading: 90,
            interior: 5,
        },
        {
            name: "#GENOTB",
            pos: [833.819, 7.418, 1003.18],
            heading: 90,
            interior: 3,
        },
        {
            name: "#GENWRHS",
            pos: [1302.52, -1.78751, 999.932],
            heading: 148,
            interior: 18,
        },
        {
            name: "Girlfriend 1",
            pos: [245.412, 305.033, 998.232],
            heading: 270,
            interior: 1,
        },
        {
            name: "Girlfriend 2",
            pos: [271.885, 306.632, 998.326],
            heading: 134,
            interior: 2,
        },
        {
            name: "Girlfriend 3",
            pos: [291.283, 310.032, 998.155],
            heading: 90,
            interior: 3,
        },
        {
            name: "Girlfriend 4",
            pos: [302.181, 301.723, 998.232],
            heading: 0,
            interior: 4,
        },
        {
            name: "Girlfriend 5",
            pos: [322.198, 303.498, 998.232],
            heading: 0,
            interior: 5,
        },
        {
            name: "Girlfriend 6",
            pos: [345.915, 305.033, 998.232],
            heading: 270,
            interior: 6,
        },
        {
            name: "#GYM1",
            pos: [772.112, -3.89865, 999.688],
            heading: 0,
            interior: 5,
        },
        {
            name: "#GYM2",
            pos: [774.214, -48.9243, 999.688],
            heading: 0,
            interior: 6,
        },
        {
            name: "#GYM3",
            pos: [773.58, -77.0967, 999.688],
            heading: 0,
            interior: 7,
        },
        {
            name: "Shamal cabin",
            pos: [2.38483, 33.1034, 1198.85],
            heading: 180,
            interior: 1,
        },
        {
            name: "#JUMP1",
            pos: [2265.79, 1619.58, 1089.5],
            heading: 270,
            interior: 1,
        },
        {
            name: "#JUMP2",
            pos: [2265.78, 1675.93, 1089.5],
            heading: 270,
            interior: 1,
        },
        {
            name: "#LACRAK",
            pos: [318.565, 1118.21, 1082.98],
            heading: 0,
            interior: 5,
        },
        {
            name: "#LACS1",
            pos: [203.778, -48.4924, 1000.8],
            heading: 0,
            interior: 1,
        },
        {
            name: "#LAHS1A",
            pos: [225.757, 1240, 1081.15],
            heading: 90,
            interior: 2,
        },
        {
            name: "#LAHS1B",
            pos: [223.044, 1289.26, 1081.2],
            heading: 0,
            interior: 1,
        },
        {
            name: "#LAHS2A",
            pos: [260.984, 1286.55, 1079.3],
            heading: 0,
            interior: 4,
        },
        {
            name: "#LAHS2B",
            pos: [260.942, 1238.51, 1083.26],
            heading: -2,
            interior: 9,
        },
        {
            name: "#LAHSB1",
            pos: [234.046, 1064.88, 1083.31],
            heading: 0,
            interior: 6,
        },
        {
            name: "#LAHSB2",
            pos: [225.631, 1022.48, 1083.07],
            heading: 0,
            interior: 7,
        },
        {
            name: "#LAHSB3",
            pos: [227.723, 1114.39, 1080.19],
            heading: 270,
            interior: 5,
        },
        {
            name: "#LAHSB4",
            pos: [235.109, 1189.77, 1079.34],
            heading: 0,
            interior: 3,
        },
        {
            name: "#LAHSS6",
            pos: [221.667, 1143.39, 1081.68],
            heading: 0,
            interior: 4,
        },
        {
            name: "#LASTRIP",
            pos: [1204.81, -11.5868, 1000.09],
            heading: 0,
            interior: 2,
        },
        {
            name: "#MADDOGS",
            pos: [1263.08, -785.309, 1090.96],
            heading: 275,
            interior: 5,
        },
        {
            name: "#MDDOGS",
            pos: [1299.08, -795.227, 1083.03],
            heading: -8,
            interior: 5,
        },
        {
            name: "#MAFCAS",
            pos: [2233.91, 1710.73, 1010.18],
            heading: 180,
            interior: 1,
        },
        {
            name: "#MAFCAS2",
            pos: [2138.61, 1599.54, 1007.41],
            heading: 270,
            interior: 1,
        },
        {
            name: "#MAFCAS2",
            pos: [2268.74, 1647.52, 1083.23],
            heading: 270,
            interior: 1,
        },
        {
            name: "#MARKS",
            pos: [-750.8, 491.0, 1370.7],
            heading: 0,
            interior: 1,
        },
        {
            name: "#MARKS",
            pos: [-783.86, 494.5, 1375.2],
            heading: 32.05,
            interior: 1,
        },
        {
            name: "U Get Inn Motel",
            pos: [446.623, 509.319, 1000.42],
            heading: 270,
            interior: 12,
        },
        {
            name: "#MOTEL1",
            pos: [2216.34, -1150.51, 1024.8],
            heading: -90,
            interior: 15,
        },
        {
            name: "#OGLOCS",
            pos: [516.271, -16.6119, 1000.46],
            heading: 0,
            interior: 3,
        },
        {
            name: "#PAPER",
            pos: [388.872, 173.805, 1007.39],
            heading: 90,
            interior: 3,
        },
        {
            name: "#PDOMES",
            pos: [-2661.01, 1415.74, 921.2],
            heading: 180,
            interior: 3,
        },
        {
            name: "#PDOMES2",
            pos: [-2637.45, 1404.63, 905.458],
            heading: 0,
            interior: 3,
        },
        {
            name: "#POLICE1",
            pos: [246.784, 63.9002, 1002.64],
            heading: 0,
            interior: 6,
        },
        {
            name: "#POLICE2",
            pos: [246.376, 109.246, 1002.28],
            heading: 0,
            interior: 10,
        },
        {
            name: "#POLICE3",
            pos: [288.746, 169.351, 1006.18],
            heading: 0,
            interior: 3,
        },
        {
            name: "#POLICE4",
            pos: [238.662, 141.052, 1002.05],
            heading: 0,
            interior: 3,
        },
        {
            name: "#RCPLAY",
            pos: [-2239.57, 130.021, 1034.42],
            heading: 325,
            interior: 6,
        },
        {
            name: "#REST2",
            pos: [441.982, -52.2199, 998.689],
            heading: 180,
            interior: 6,
        },
        {
            name: "#RYDERS",
            pos: [2464.11, -1698.66, 1012.51],
            heading: 91.8502,
            interior: 2,
        },
        {
            name: "#SEXSHOP",
            pos: [-100.326, -22.8165, 999.742],
            heading: 0,
            interior: 3,
        },
        {
            name: "#SFHSB1",
            pos: [140.278, 1368.98, 1082.97],
            heading: 0,
            interior: 5,
        },
        {
            name: "#SFHSB3",
            pos: [83.3451, 1324.44, 1082.89],
            heading: -40,
            interior: 9,
        },
        {
            name: "#SFHSM1",
            pos: [-285.549, 1470.98, 1083.45],
            heading: 90,
            interior: 15,
        },
        {
            name: "#SFHSM2",
            pos: [-262.602, 1456.62, 1083.45],
            heading: 90,
            interior: 4,
        },
        {
            name: "#SFHSS1",
            pos: [-42.582, 1408.11, 1083.45],
            heading: 0,
            interior: 8,
        },
        {
            name: "#SFHSS2",
            pos: [-68.2941, 1353.47, 1079.28],
            heading: 0,
            interior: 6,
        },
        {
            name: "Warehouse",
            pos: [1412.64, -1.78751, 999.932],
            heading: 148,
            interior: 1,
        },
        {
            name: "#STRIP2",
            pos: [1212.02, -28.6631, 1000.09],
            heading: -180,
            interior: 3,
        },
        {
            name: "Blastin' Fools Records",
            pos: [1038.51, -0.663752, 1000.09],
            heading: 0,
            interior: 3,
        },
        {
            name: "#SVCUNT",
            pos: [2333.11, -1075.1, 1048.04],
            heading: 0,
            interior: 6,
        },
        {
            name: "#SVGNMT1",
            pos: [2253.14, -1140.09, 1049.65],
            heading: 90,
            interior: 9,
        },
        {
            name: "#SVGNMT2",
            pos: [2261.4, -1135.94, 1049.64],
            heading: 270,
            interior: 10,
        },
        {
            name: "#SVHOT1",
            pos: [2233.8, -1113.36, 1049.91],
            heading: 0,
            interior: 5,
        },
        {
            name: "#SVLABIG",
            pos: [2324.42, -1147.54, 1049.72],
            heading: 0,
            interior: 12,
        },
        {
            name: "#SVLAMD",
            pos: [2365.3, -1132.92, 1049.91],
            heading: 0,
            interior: 8,
        },
        {
            name: "#SVLASM",
            pos: [2282.91, -1138.29, 1049.91],
            heading: 0,
            interior: 11,
        },
        {
            name: "#SVSFBG",
            pos: [2194.79, -1204.35, 1048.05],
            heading: 90,
            interior: 6,
        },
        {
            name: "#SVSFMD",
            pos: [2268.39, -1210.45, 1046.57],
            heading: 90,
            interior: 10,
        },
        {
            name: "#SVSFSM",
            pos: [2308.79, -1210.88, 1048.03],
            heading: 0,
            interior: 6,
        },
        {
            name: "#SVVGHO1",
            pos: [2215.54, -1076.29, 1049.52],
            heading: 90,
            interior: 1,
        },
        {
            name: "#SVVGHO2",
            pos: [2237.59, -1078.87, 1048.07],
            heading: 0,
            interior: 2,
        },
        {
            name: "#SVVGMD",
            pos: [2317.82, -1024.75, 1049.21],
            heading: 0,
            interior: 9,
        },
        {
            name: "#SWEETS",
            pos: [2526.46, -1679.09, 1014.5],
            heading: 271.687,
            interior: 1,
        },
        {
            name: "#TATTO2",
            pos: [-204.44, -8.4696, 1001.3],
            heading: 0,
            interior: 17,
        },
        {
            name: "#TATTO3",
            pos: [-204.44, -43.6525, 1001.3],
            heading: 0,
            interior: 3,
        },
        {
            name: "#TATTOO",
            pos: [-204.44, -26.454, 1001.3],
            heading: 0,
            interior: 16,
        },
        {
            name: "#TRICAS",
            pos: [2015.45, 1017.09, 995.882],
            heading: 90,
            interior: 10,
        },
        {
            name: "#TSDINER",
            pos: [681.475, -451.151, -26.6168],
            heading: 180,
            interior: 1,
        },
        {
            name: "#VGHSB1",
            pos: [447.735, 1400.44, 1083.34],
            heading: -1,
            interior: 2,
        },
        {
            name: "#VGHSB3",
            pos: [490.811, 1401.49, 1079.34],
            heading: 0,
            interior: 2,
        },
        {
            name: "#VGHSM2",
            pos: [22.7783, 1404.96, 1083.45],
            heading: 0,
            interior: 5,
        },
        {
            name: "#VGHSM3",
            pos: [27.1327, 1341.15, 1083.45],
            heading: -43,
            interior: 10,
        },
        {
            name: "#VGHSS1",
            pos: [295.139, 1474.47, 1079.52],
            heading: 0,
            interior: 15,
        },
        {
            name: "#VGSHM2",
            pos: [385.804, 1471.77, 1079.21],
            heading: 90,
            interior: 15,
        },
        {
            name: "#VGSHM3",
            pos: [375.972, 1417.27, 1080.41],
            heading: 90,
            interior: 15,
        },
        {
            name: "#VGSHS2",
            pos: [328.494, 1480.59, 1083.45],
            heading: 0,
            interior: 15,
        },
        {
            name: "#WUZIBET",
            pos: [-2158.72, 641.288, 1051.37],
            heading: 179.81,
            interior: 1,
        },
        {
            name: "#X711S2",
            pos: [-27.3123, -29.2776, 1002.55],
            heading: 0,
            interior: 4,
        },
        {
            name: "#X711S3",
            pos: [6.09118, -29.2719, 1002.55],
            heading: 0,
            interior: 10,
        },
        {
            name: "#X7_11B",
            pos: [-30.9467, -89.6096, 1002.55],
            heading: 0,
            interior: 18,
        },
        {
            name: "#X7_11C",
            pos: [-25.1326, -139.067, 1002.55],
            heading: 0,
            interior: 16,
        },
        {
            name: "#X7_11D",
            pos: [-25.8845, -185.869, 1002.55],
            heading: 0,
            interior: 17,
        },
        {
            name: "#X7_11S",
            pos: [-26.6916, -55.7149, 1002.55],
            heading: 0,
            interior: 6,
        },
    ],
    name: "#LAHS1A",
};

let buffer: int = Memory.Allocate(8);

// Submenus for each area
[LS, SF, LV, other, interiors].forEach((c) => {
    c.menu = new AltMenu(
        c.name,
        c.locations.map((l) => ({
            name: l?.name,
            description: `${l.pos[0]}, ${l.pos[1]}, ${l.pos[2]}`,
            enter: function () {
                Streaming.RequestCollision(l.pos[0], l.pos[1]);
                Streaming.LoadScene(l.pos[0], l.pos[1], l.pos[2]);

                if (l.interior) {
                    // Thanks to Seemann for fixing a crash in burglary interiors via memory!
                    Memory.WriteI32(0xbb3a18, 0, false);
                    Memory.WriteI32(0xbb3914, 0, false);
                    Memory.Write(0xbb3a34, 16, 1, false); // optional
                    Streaming.SetAreaVisible(l.interior);
                    plc.setAreaVisible(l.interior);
                } else if (plc.getAreaVisible() !== 0) {
                    Streaming.SetAreaVisible(0);
                    plc.setAreaVisible(0);
                }

                // Teleport into interiors differently
                if (l.interior) {
                    plc.setCoordinates(l.pos[0], l.pos[1], l.pos[2]);

                    // Thanks to Miran for fixing markers inside interiors
                    Memory.WriteFloat(buffer, l.pos[0], false);
                    Memory.WriteFloat(buffer + 4, l.pos[1], false);

                    // Get enex's index [CEntryExitManager::FindNearestEntryExit]
                    let enexIndex = Memory.Fn.Cdecl(0x43f4b0)(
                        buffer,
                        Memory.FromFloat(10),
                        -1,
                    );
                    if (enexIndex !== -1) {
                        // Get enex's pointer [EntryExitPool__atIndex]
                        let enex = Memory.Fn.Cdecl(0x43ef00)(enexIndex);

                        if (enex !== 0) {
                            Memory.WriteI32(0x96a7c4, 0, false); // Clear player's enex history
                            Memory.Fn.Cdecl(0x43e410)(enex); // Add entry/exit to stack
                        }
                    }
                } else {
                    plc.setCoordinatesNoOffset(l.pos[0], l.pos[1], l.pos[2]);
                }

                // Teleport player's vehicle
                if (plc.isInAnyCar()) {
                    plc.storeCarIsInNoSave().setAreaVisible(
                        Streaming.GetAreaVisible(),
                    );
                }

                plc.setHeading(l.heading);
                Camera.SetBehindPlayer();
            },
        })),
        {
            showCounter: true,
        },
    );
});

export let teleportMenu: AltMenu = new AltMenu(
    "Teleporter",
    [LS, SF, LV, other, interiors]
        .map((c) => ({
            name: c.name,
            description: c?.description,
            click: function () {
                while (c.menu.isDisplayed()) {
                    wait(0);
                }
            },
        }))
        .concat({
            name: "#LG_64",
            description: undefined,
            click: function () {
                let waypoint = World.GetTargetCoords();
                if (waypoint) {
                    Streaming.RequestCollision(waypoint.x, waypoint.y);
                    Streaming.LoadScene(waypoint.x, waypoint.y, waypoint.z);
                    plc.setCoordinates(waypoint.x, waypoint.y, -100);
                } else {
                    Text.PrintStringNow("~r~~h~Map target not found!", 2000);
                }
            },
        }),
);
