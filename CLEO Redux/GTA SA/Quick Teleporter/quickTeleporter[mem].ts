//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { SimpleMenu } from "./simpleMenu";

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();

// Interfaces
interface Location {
    pos: [float, float, float],
    heading: float,
    interior?: int,
    name?: string,
}

interface Area {
    locations: Location[],
    name: string,
    description?: string
    menu?: SimpleMenu,
}

// Variables
let LS: Area = {
    locations: [
        { name: '#CHC', pos: [2210.40, -1108.70, 26.11], heading: 197.65 },
        { name: '#EBE', pos: [2652.83, -1645.69, 10.87], heading: 237.26 },
        { name: '#EBE', pos: [2858.01, -1181.24, 24.70], heading: 56.10 },
        { name: '#ELCO', pos: [1833.14, -1885.20, 13.42], heading: 64.02 },
        { name: '#GAN', pos: [2489.49, -1666.60, 13.34], heading: 207.35 },
        { name: '#JEF', pos: [2239.95, -1260.80, 23.94], heading: 269.85 },
        { name: '#LAIR', pos: [1585.23, -2443.75, 13.55], heading: 141.54 },
        { name: '#LDOC', pos: [2498.45, -2486.68, 13.64], heading: 249.84 },
        { name: '#LDOC', pos: [2781.65, -2399.92, 13.64], heading: 284.91 },
        { name: '#LDT', pos: [1535.60, -1363.82, 329.46], heading: 36.71 },
        { name: '#LIND', pos: [2406.50, -1907.00, 13.55], heading: 350.51 },
        { name: '#LIND', pos: [2651.91, -2009.87, 13.55], heading: 268.20 },
        { name: '#MAR', pos: [764.52, -1593.70, 13.55], heading: 103.50 },
        { name: '#ROD', pos: [456.17, -1295.85, 15.30], heading: 237.59 },
        { name: '#SMB', pos: [150.60, -1764.56, 4.69], heading: 182.51 },
        { name: '#VERO', pos: [724.86, -1846.77, 12.06], heading: 136.79 },
        { name: '#VIN', pos: [770.86, -1147.88, 23.12], heading: 205.65 },
    ],
    name: '#LA'
};

let SF: Area = {
    locations: [
        { name: '#BATTP', pos: [-2599.00, 1380.63, 7.14], heading: 27.48 },
        { name: '#BAYV', pos: [-2819.85, 1117.64, 28.61], heading: 164.86 },
        { name: '#CITYS', pos: [-2708.61, 394.90, 4.37], heading: 201.16 },
        { name: '#CIVI', pos: [-2688.41, 576.48, 14.74], heading: 269.44 },
        { name: '#CRANB', pos: [-1997.29, 119.29, 27.69], heading: 13.51 },
        { name: '#CUNTC', pos: [-2290.74, -246.86, 42.96], heading: 344.53 },
        { name: '#CUNTC', pos: [-2684.63, -255.34, 7.03], heading: 143.61 },
        { name: '#DOH', pos: [-1997.02, -84.00, 35.44], heading: 50.13 },
        { name: '#EASB', pos: [-1538.04, 513.94, 7.18], heading: 246.55 },
        { name: '#EASB', pos: [-1640.93, 545.04, 39.02], heading: 316.49 },
        { name: '#EASB', pos: [-1727.95, 30.69, 3.55], heading: 321.47 },
        { name: '#ESPN', pos: [-1642.66, 1310.94, 7.18], heading: 111.27 },
        { name: '#FINA', pos: [-1753.62, 885.38, 295.88], heading: 286.46 },
        { name: '#HILLP', pos: [-2453.57, -607.62, 132.54], heading: 130.03 },
        { name: '#PARA', pos: [-2662.48, 1233.21, 55.58], heading: 8.77 },
        { name: '#SFAIR', pos: [-1299.07, -615.38, 14.15], heading: 354.06 },
        { name: '#SFDWT', pos: [-1510.12, 924.50, 7.19], heading: 2.89 },
    ],
    name: '#SF'
};

let LV: Area = {
    locations: [
        { name: '#CALI', pos: [2153.38, 1656.19, 10.82], heading: 317.74 },
        { name: '#GGC', pos: [1135.46, 1113.62, 11.00], heading: 144.65 },
        { name: '#ISLE', pos: [2086.23, 2318.42, 10.82], heading: 311.06 },
        { name: '#LINDEN', pos: [2858.59, 1298.40, 11.39], heading: 202.03 },
        { name: '#OVS', pos: [2334.79, 2127.08, 10.82], heading: 295.75 },
        { name: '#PRP', pos: [1765.26, 2742.49, 10.84], heading: 353.72 },
        { name: '#REDW', pos: [1558.19, 2180.63, 10.82], heading: 4.65 },
        { name: '#ROCE', pos: [2316.50, 2402.97, 10.82], heading: 45.95 },
        { name: '#ROCE', pos: [2623.07, 2213.91, 10.82], heading: 6.92 },
        { name: '#ROY', pos: [2198.64, 1426.59, 10.82], heading: 67.90 },
        { name: '#SPIN', pos: [2408.93, 2709.98, 10.82], heading: 290.39 },
        { name: '#STAR', pos: [2365.51, 1958.96, 10.82], heading: 3.87 },
        { name: '#STRIP', pos: [2030.83, 990.26, 10.81], heading: 357.35 },
        { name: '#STRIP', pos: [2081.54, 1224.24, 10.82], heading: 281.27 },
        { name: '#STRIP', pos: [2115.05, 1765.58, 10.82], heading: 314.68 },
        { name: '#VAIR', pos: [1301.91, 1289.64, 10.82], heading: 330.77 },
        { name: '#VISA', pos: [2085.40, 1957.98, 11.33], heading: 124.83 },
        { name: '#YBELL', pos: [1520.88, 2766.32, 10.82], heading: 81.80 },
    ],
    name: '#VE'
};

let other: Area = {
    locations: [
        { name: '#ANGPI', pos: [-2202.13, -2370.10, 30.62], heading: 249.77 },
        { name: '#BARRA', pos: [-857.50, 1560.63, 24.30], heading: 201.36 },
        { name: '#BFLD', pos: [1093.93, 1381.03, 10.82], heading: 348.91 },
        { name: '#BIGE', pos: [-285.38, 1511.40, 75.56], heading: 25.07 },
        { name: '#BLUEB', pos: [146.51, -86.03, 1.58], heading: 64.02 },
        { name: '#CARSO', pos: [-153.54, 1088.72, 19.74], heading: 59.73 },
        { name: '#DAM', pos: [-820.39, 1931.98, 7.00], heading: 308.59 },
        { name: '#DAM', pos: [-898.41, 1997.73, 60.91], heading: 296.00 },
        { name: '#DILLI', pos: [651.15, -589.90, 16.34], heading: 21.29 },
        { name: '#ELQUE', pos: [-1472.31, 2683.57, 55.84], heading: 183.15 },
        { name: '#MEAD', pos: [430.39, 2522.37, 16.48], heading: 98.09 },
        { name: '#MONT', pos: [1323.46, 345.12, 19.55], heading: 192.44 },
        { name: '#MTCHI', pos: [-2235.75, -1734.30, 480.82], heading: 251.73 },
        { name: '#PALO', pos: [2278.68, 99.59, 26.48], heading: 236.53 },
        { name: '#PAYAS', pos: [-293.93, 2614.06, 63.26], heading: 294.30 },
        { name: '#REST', pos: [355.26, 1779.04, 17.23], heading: 44.66 },
        { name: '#SUNNN', pos: [-2473.65, 2345.59, 5.50], heading: 239.51 },
        { name: '#TOM', pos: [-302.74, 1854.20, 42.29], heading: 75.20 },
    ],
    name: '#FED_BL4'
};

let interiors: Area = {
    locations: [
        { pos: [-27.3769, -27.6416, 1003.5570], heading: 0, interior: 4 },
        { pos: [-26.7180, -55.9860, 1003.5470], heading: 0, interior: 6 },
        { pos: [6.0780, -28.6330, 1003.5490], heading: 0, interior: 10 },
        { pos: [-25.3730, -139.6540, 1003.5470], heading: 0, interior: 16 },
        { pos: [-25.3930, -185.9110, 1003.5470], heading: 0, interior: 17 },
        { pos: [-30.9460, -89.6090, 1003.5490], heading: 0, interior: 18 },
        { pos: [-1417.8720, -276.4260, 1051.1910], heading: 0, interior: 7 },
        { pos: [419.6140, 2536.6030, 10.0000], heading: 0, interior: 10 },
        { pos: [288.21, -35.82, 1001.52], heading: 0, interior: 1 },
        { pos: [285.8000, -84.5470, 1001.5390], heading: 0, interior: 4 },
        { pos: [297.4460, -109.9680, 1001.5160], heading: 0, interior: 6 },
        { pos: [317.2380, -168.0520, 999.5930], heading: 0, interior: 6 },
        { pos: [315.3850, -142.2420, 999.6010], heading: 0, interior: 7 },
        { pos: [315.48, 984.13, 1959.11], heading: 0, interior: 9 },
        { pos: [0.3440, -0.5140, 1000.5490], heading: 0, interior: 2 },
        { pos: [1726.1370, -1645.2300, 20.2260], heading: 0, interior: 18 },
        { pos: [322.31, 304.33, 999.15], heading: 355.05, interior: 5 },
        { pos: [1527.38, -11.02, 1002.10], heading: 0, interior: 3 },
        { pos: [1523.7510, -46.0458, 1002.1310], heading: 0, interior: 2 },
        { pos: [774.2430, -76.0090, 1000.6540], heading: 0, interior: 7 },
        { pos: [2543.86, -1304.13, 1025.07], heading: 178.84, interior: 2 },
        { pos: [1210.2570, -29.2986, 1000.8790], heading: 180, interior: 3 },
        { pos: [1494.54, 1305.82, 1093.29], heading: 272.33, interior: 3 },
        { pos: [207.5430, -109.0040, 1005.1330], heading: 0, interior: 15 },
        { pos: [-1394.20, 987.62, 1023.96], heading: 0, interior: 15 },
        { pos: [940.6520, -18.4860, 1000.9300], heading: 0, interior: 3 },
        { pos: [964.11, -53.21, 1001.12], heading: 90.00, interior: 3 },
        { pos: [444.6469, 508.2390, 1001.4194], heading: 0, interior: 12 },
        { pos: [366.4220, -73.4700, 1001.5080], heading: 0, interior: 10 },
        { pos: [224.6351, 1289.012, 1082.141], heading: 0, interior: 1 },
        { pos: [229.06, 1114.62, 1080.99], heading: 262.64, interior: 5 },
        { pos: [140.5631, 1369.051, 1083.864], heading: 0, interior: 5 },
        { pos: [85.32596, 1323.585, 1083.859], heading: 0, interior: 9 },
        { pos: [260.3189, 1239.663, 1084.258], heading: 0, interior: 9 },
        { pos: [21.241, 1342.153, 1084.375], heading: 0, interior: 10 },
        { pos: [234.319, 1066.455, 1084.208], heading: 0, interior: 6 },
        { pos: [-69.049, 1354.056, 1080.211], heading: 0, interior: 6 },
        { pos: [-285.711, 1470.697, 1084.375], heading: 0, interior: 15 },
        { pos: [327.808, 1479.74, 1084.438], heading: 0, interior: 15 },
        { pos: [375.572, 1417.439, 1081.328], heading: 90, interior: 15 },
        { pos: [224.68, 1240.00, 1082.14], heading: 55.74, interior: 2 },
        { pos: [384.43, 1471.65, 1080.19], heading: 87.09, interior: 15 },
        { pos: [295.467, 1474.697, 1080.258], heading: 0, interior: 15 },
        { pos: [-42.490, 1407.644, 1084.43], heading: 0, interior: 8 },
        { pos: [447.470, 1398.348, 1084.305], heading: 0, interior: 2 },
        { pos: [491.740, 1400.541, 1080.265], heading: 0, interior: 2 },
        { pos: [234.733, 1190.391, 1080.258], heading: 0, interior: 3 },
        { pos: [-263.07, 1455.11, 1084.37], heading: 96.95, interior: 4 },
        { pos: [221.4296, 1142.423, 1082.609], heading: 0, interior: 4 },
        { pos: [261.1168, 1286.519, 1080.258], heading: 0, interior: 4 },
        { pos: [22.79996, 1404.642, 1084.43], heading: 0, interior: 5 },
        { pos: [2349.59, -1180.95, 1027.98], heading: 90, interior: 5 },
        { pos: [2235.2524, 1708.5146, 1010.6129], heading: 180, interior: 1 },
        // { pos: [-2043.966, 172.932, 28.835], heading: 0, interior: 13 },
        { pos: [493.4687, -23.0080, 1000.6796], heading: 0, interior: 17 },
        { pos: [365.67, -9.61, 1002], heading: 0, interior: 9 },
        { pos: [774.0870, -47.9830, 1000.5860], heading: 0, interior: 6 },
        { pos: [2807.8990, -1172.9210, 1025.5700], heading: 0, interior: 8 },
        { pos: [245.5, 304.8456, 999.1484], heading: 270, interior: 1 },
        { pos: [204.1789, -165.8740, 1000.5230], heading: 0, interior: 14 },
        { pos: [448.7435, -110.0457, 1000.0772], heading: 270, interior: 5 },
        { pos: [458.70, -88.43, 999.62], heading: 90, interior: 4 },
        { pos: [-1435.8690, -662.2505, 1052.4650], heading: 0, interior: 4 },
        { pos: [-2042.42, 178.59, 28.84], heading: 0, interior: 1 },
        { pos: [-2029.65, -106.04, 1035.17], heading: 180, interior: 3 },
        { pos: [744.2710, 1437.2530, 1102.7030], heading: 0, interior: 6 },
        { pos: [2009.4140, 1017.8990, 994.4680], heading: 90, interior: 10 },
        { pos: [-1855.5687, 41.2631, 1061.1435], heading: 0, interior: 14 },
        // { pos: [-1827.1473, 63736, 1061.1435], heading: 0, interior: 14 },
        { pos: [768.0793, 5.8606, 1000.7160], heading: 0, interior: 5 },
        { pos: [418.6530, -82.6390, 1001.8050], heading: 0, interior: 3 },
        { pos: [2264.5231, -1210.5229, 1049.0234], heading: 90, interior: 10 },
        { pos: [291.33, 308.7790, 999.1484], heading: 90, interior: 3 },
        { pos: [377.0030, -192.5070, 1000.6330], heading: 0, interior: 17 },
        { pos: [826.8863, 5.5091, 1004.4830], heading: 270, interior: 3 },
        { pos: [1891.3960, 1018.1260, 31.8820], heading: 0, interior: 10 },
        { pos: [2217.6250, -1150.6580, 1025.7970], heading: 0, interior: 15 },
        { pos: [-2637.01, 1404.72, 906.46], heading: 90, interior: 3 },
        { pos: [2496.0500, -1693.9260, 1014.7420], heading: 180, interior: 3 },
        { pos: [267.2290, 304.9, 999.1480], heading: 290, interior: 2 },
        { pos: [-1464.5360, 1557.6900, 1052.5310], heading: 0, interior: 14 },
        { pos: [374.6708, 173.8050, 1008.3893], heading: 90, interior: 3 },
        { pos: [-750.80, 491.00, 1371.70], heading: 0, interior: 1 },
        { pos: [-227.0280, 1401.2290, 27.7690], heading: 0, interior: 18 },
        // { pos: [612.5910, -75.6370, 997.9920], heading: 0, interior: 2 },
        { pos: [2282.9766, -1138.2861, 1050.8984], heading: 0, interior: 11 },
        // { pos: [1724.33, -1625.784, 20.211], heading: 0, interior: 13 },
        { pos: [-204.5580, -25.6970, 1002.2730], heading: 0, interior: 16 },
        { pos: [246.4510, 65.5860, 1003.6410], heading: 0, interior: 6 },
        { pos: [-204.4390, -43.6520, 1002.2990], heading: 0, interior: 3 },
        { pos: [289.7703, 171.7460, 1007.1790], heading: 0, interior: 3 },
        { pos: [411.6410, -51.8460, 1001.8980], heading: 0, interior: 12 },
        { pos: [1262.1451, -785.3297, 1091.9062], heading: 300, interior: 5 },
        { pos: [302.6404, 304.8048, 999.1484], heading: 0, interior: 4 },
        { pos: [345.40, 307.97, 999.16], heading: 182, interior: 6 },
        { pos: [2324.4990, -1147.0710, 1050.7100], heading: 0, interior: 12 },
        { pos: [515.22, -11.76, 1001.57], heading: 142.13, interior: 3 },
        { pos: [322.72, 306.43, 999.15], heading: 0, interior: 5 },
        { pos: [207.3560, -138.0029, 1003.3130], heading: 0, interior: 3 },
        { pos: [-975.5766, 1061.1312, 1345.6719], heading: 90, interior: 10 },
        { pos: [1038.2190, 6.9905, 1001.2840], heading: 0, interior: 3 },
        { pos: [411.6259, -21.4332, 1001.8046], heading: 0, interior: 2 },
        { pos: [446.6941, -9.7977, 1000.7340], heading: 0, interior: 1 },
        // { pos: [443.9810, -65.2190, 1050.0000], heading: 0, interior: 6 },
        { pos: [377.0030, -192.5070, 1000.6330], heading: 0, interior: 17 },
        { pos: [2464.2110, -1697.9520, 1013.5080], heading: 90, interior: 2 },
        { pos: [2262.83, -1137.71, 1050.63], heading: 0, interior: 10 },
        { pos: [2365.2383, -1132.2969, 1050.875], heading: 0, interior: 8 },
        { pos: [2333.0330, -1073.9600, 1049.0230], heading: 0, interior: 6 },
        { pos: [2215.79, -1076.43, 1050.48], heading: 90, interior: 1 },
        { pos: [2194.2910, -1204.0150, 1049.0230], heading: 90, interior: 6 },
        { pos: [2308.8710, -1210.7170, 1049.0230], heading: 0, interior: 6 },
        { pos: [2324.3848, -1148.4805, 1050.7101], heading: 0, interior: 12 },
        { pos: [-106.7268, -19.6444, 1000.7190], heading: 0, interior: 3 },
        { pos: [246.4410, 112.1640, 1003.2190], heading: 0, interior: 10 },
        { pos: [1.6127, 34.7411, 1199.0], heading: 0, interior: 1 },
        { pos: [963.6078, 2108.3970, 1011.0300], heading: 90, interior: 1 },
        { pos: [203.8173, -46.5385, 1001.8050], heading: 0, interior: 1 },
        { pos: [-1400, 1250, 1040], heading: 0, interior: 16 },
        { pos: [2526.01, -1679.1150, 1015.4990], heading: 270, interior: 1 },
        { pos: [502.3310, -70.6820, 998.7570], heading: 180, interior: 11 },
        { pos: [1132.9450, -8.6750, 1000.6800], heading: 0, interior: 12 },
        { pos: [322.1117, 1119.3270, 1083.8830], heading: 0, interior: 5 },
        // { pos: [2011.60, 1017.02, 39.09], heading: 0, interior: 11 },
        { pos: [1213.4330, -6.6830, 1000.9220], heading: 0, interior: 2 },
        { pos: [-942.1320, 1849.1420, 5.0050], heading: 0, interior: 17 },
        { pos: [681.65, -452.86, -25.62], heading: 0, interior: 1 },
        { pos: [621.7850, -12.5417, 1000.9220], heading: 0, interior: 1 },
        { pos: [-1401.13, 106.110, 1032.273], heading: 0, interior: 1 },
        { pos: [2253.1740, -1139.0100, 1050.6330], heading: 0, interior: 9 },
        { pos: [2232.8210, -1110.0180, 1050.8830], heading: 0, interior: 5 },
        { pos: [223.70, -7.36, 1002.21], heading: 92, interior: 5 },
        { pos: [255.93, -40.98, 1002.02], heading: 263.67, interior: 14 },
        { pos: [1405.3120, -8.2928, 1000.9130], heading: 0, interior: 1 },
        { pos: [1296.84, 0.74, 1001.02], heading: 180.54, interior: 18 },
        { pos: [377.7758, -126.2766, 1001.4920], heading: 0, interior: 5 },
        // { pos: [614.3889, -124.0991, 997.9950], heading: 0, interior: 3 },
        { pos: [-2160.14, 641.62, 1052.38], heading: 91.38, interior: 1 },
        { pos: [161.4620, -91.3940, 1001.8050], heading: 0, interior: 18 },
    ],
    name: '#LAHS1A',
    description: 'Thanks to ~g~Seemann~s~ (https://github.com/~y~x87)~s~~n~for fixing burglary interiors!'
};

// Submenus for each area
[LS, SF, LV, other, interiors].forEach(c => {
    c.menu = new SimpleMenu(c.name, c.locations.map(l => ({
        name: l?.name,
        before: function () {
            Streaming.RequestCollision(l.pos[0], l.pos[1]);
            Streaming.LoadScene(l.pos[0], l.pos[1], l.pos[2]);
            if (l.interior) {
                // Thanks to Seemann for fixing a crash in burglary interiors via memory!
                Memory.WriteI32(0xBB3A18, 0, false);
                Memory.WriteI32(0xBB3914, 0, false);
                Memory.Write(0xBB3A34, 16, 1, false); // optional
                Streaming.SetAreaVisible(l.interior);
                plc.setAreaVisible(l.interior);
            } else if (plc.getAreaVisible() !== 0) {
                Streaming.SetAreaVisible(0);
                plc.setAreaVisible(0);
            }
            plc.setCoordinatesNoOffset(l.pos[0], l.pos[1], l.pos[2]);
            plc.setHeading(l.heading);
            Camera.SetBehindPlayer();
            Camera.DoFade(150, 1);
            while (Camera.GetFadingStatus()) {
                c.menu.displayCurrentOption();
                wait(0);
            }
        }
    })), {
        disableControls: true,
        exitOnDeathArrest: true,
        exitOnEnterCarButton: true,
        after: function () {
            Camera.DoFade(100, 0);
            while (Camera.GetFadingStatus()) {
                c.menu.displayCurrentOption();
                wait(0);
            }
        }
    });
});

let teleport: SimpleMenu = new SimpleMenu('~s~Quick teleporter~n~By ~y~Vital',
    [LS, SF, LV, other, interiors].map(c => ({
        name: c.name,
        description: c?.description,
        confirm: function () {
            while (c.menu.show()) {
                wait(0);
            }
        }
    })).concat({
        name: '#LG_64',
        description: undefined,
        confirm: function (): boolean {
            let waypoint = World.GetTargetCoords();
            if (waypoint) {
                Streaming.RequestCollision(waypoint.x, waypoint.y);
                Streaming.LoadScene(waypoint.x, waypoint.y, waypoint.z);
                plc.setCoordinates(waypoint.x, waypoint.y, -100);
            } else {
                Text.PrintStringNow('~r~~h~Map target not found!', 2000);
            }
            return false;
        },
    }),
    { // Defaults
        addHelp: true,
        disableHud: true,
        disableControls: true,
        exitOnDeathArrest: true,
        exitOnEnterCarButton: true,
    }
);

while (true) {
    wait(0);

    if (Pad.TestCheat('TELEP')) {
        while (teleport.show()) {
            wait(0);
        }
    }
    // addLocation(); // For devs: press Action to add location to log
}

function addLocation() {
    if (Pad.IsButtonPressed(0, 4)) {
        while (Pad.IsButtonPressed(0, 4)) {
            wait(0);
        }
        let pos = plc.getCoordinates();
        let heading = plc.getHeading();
        let zoneA = Zone.GetTextKey(pos.x, pos.y, pos.z);
        log(`{ name: '#${zoneA}', pos: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}], heading: ${heading.toFixed(2)} }`);
        Sound.AddOneOffSound(0, 0, 0, 1054);
    }
}