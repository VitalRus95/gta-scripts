//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { SimpleMenu } from "./simpleMenu";

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();

// Interfaces
interface Item {
    model: string,
    texture: string
}

interface Part {
    id: int,
    name: string,
    description: string,
    items: Item[],
    menu?: SimpleMenu,
    clearBodyPart?: int[],
    camOffset: [float, float, float],
    camRotation: [float, float, float]
}

// Variables
// Clothes
let torso: Part = {
    id: 0,
    name: '#TORSO',
    description: '#CHANGER',
    items: [
        { model: 'baseball', texture: 'bandits' },
        { model: 'baskball', texture: 'baskballdrib' },
        { model: 'baskball', texture: 'baskballloc' },
        { model: 'baskball', texture: 'baskballrim' },
        { model: 'bbjack', texture: 'bballjackrstar' },
        { model: 'bbjack', texture: 'bbjackrim' },
        { model: 'coach', texture: 'coach' },
        { model: 'coach', texture: 'coachsemi' },
        { model: 'denim', texture: 'denimfade' },
        { model: 'field', texture: 'field' },
        { model: 'hawaii', texture: 'bowling' },
        { model: 'hawaii', texture: 'hawaiired' },
        { model: 'hawaii', texture: 'hawaiiwht' },
        { model: 'hoodjack', texture: 'hoodjackbeige' },
        { model: 'hoodya', texture: 'hoodyabase5' },
        { model: 'hoodyA', texture: 'hoodyAblack' },
        { model: 'hoodyA', texture: 'hoodyAblue' },
        { model: 'hoodyA', texture: 'hoodyAgreen' },
        { model: 'hoodya', texture: 'hoodyamerc' },
        { model: 'hoodya', texture: 'hoodyarockstar' },
        { model: 'leather', texture: 'leather' },
        { model: 'painter', texture: 'painter' },
        { model: 'shirta', texture: 'shirtablue' },
        { model: 'shirta', texture: 'shirtagrey' },
        { model: 'shirta', texture: 'shirtayellow' },
        { model: 'shirtb', texture: 'shirtbcheck' },
        { model: 'shirtb', texture: 'shirtbgang' },
        { model: 'shirtb', texture: 'shirtbplaid' },
        { model: 'sleevt', texture: 'bbjersey' },
        { model: 'sleevt', texture: 'letter' },
        { model: 'sleevt', texture: 'sleevtbrown' },
        { model: 'suit1', texture: 'suit1blk' },
        { model: 'suit1', texture: 'suit1blue' },
        { model: 'suit1', texture: 'suit1gang' },
        { model: 'suit1', texture: 'suit1grey' },
        { model: 'suit1', texture: 'suit1red' },
        { model: 'suit1', texture: 'suit1yellow' },
        { model: 'suit2', texture: 'suit2grn' },
        { model: 'suit2', texture: 'tuxedo' },
        { model: 'sweat', texture: 'hockeytop' },
        { model: 'sweat', texture: 'sweatrstar' },
        { model: 'trackytop1', texture: 'shellsuit' },
        { model: 'trackytop1', texture: 'sportjack' },
        { model: 'trackytop1', texture: 'trackytop1pro' },
        { model: 'trackytop1', texture: 'trackytop2eris' },
        { model: 'tshirt', texture: 'sixtyniners' },
        { model: 'tshirt', texture: 'tshirtbase5' },
        { model: 'tshirt', texture: 'tshirtblunts' },
        { model: 'tshirt', texture: 'tshirtbobomonk' },
        { model: 'tshirt', texture: 'tshirtbobored' },
        { model: 'tshirt', texture: 'tshirterisorn' },
        { model: 'tshirt', texture: 'tshirterisyell' },
        { model: 'tshirt', texture: 'tshirtheatwht' },
        { model: 'tshirt', texture: 'tshirtilovels' },
        { model: 'tshirt', texture: 'tshirtlocgrey' },
        { model: 'tshirt', texture: 'tshirtmaddgrey' },
        { model: 'tshirt', texture: 'tshirtmaddgrn' },
        { model: 'tshirt', texture: 'tshirtproblk' },
        { model: 'tshirt', texture: 'tshirtprored' },
        { model: 'tshirt', texture: 'tshirtsuburb' },
        { model: 'tshirt', texture: 'tshirtwhite' },
        { model: 'tshirt', texture: 'tshirtzipcrm' },
        { model: 'tshirt', texture: 'tshirtzipgry' },
        { model: 'tshirt2', texture: 'tshirt2horiz' },
        { model: 'vest', texture: 'vest' },
        { model: 'vest', texture: 'vestblack' },
        { model: 'wcoat', texture: 'wcoatblue' },
        // { model: 'torso', texture: 'player_torso' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [-0.35, 1.7, 0.85],
    camRotation: [0, 0, 0.4]
};
let legs: Part = {
    id: 2,
    name: '#LEGS',
    description: '#CHANGER',
    items: [
        { model: 'boxingshort', texture: 'bbshortred' },
        { model: 'boxingshort', texture: 'bbshortwht' },
        { model: 'boxingshort', texture: 'boxshort' },
        { model: 'chinosb', texture: 'biegetr' },
        { model: 'chinosb', texture: 'chinosbiege' },
        { model: 'chinosb', texture: 'chinosblack' },
        { model: 'chinosb', texture: 'chinosblue' },
        { model: 'chinosb', texture: 'chinoskhaki' },
        { model: 'chonger', texture: 'chongerblue' },
        { model: 'chonger', texture: 'chongergang' },
        { model: 'chonger', texture: 'chongergrey' },
        { model: 'chonger', texture: 'chongerred' },
        { model: 'jeans', texture: 'denimsgang' },
        { model: 'jeans', texture: 'denimsred' },
        { model: 'jeans', texture: 'jeansdenim' },
        { model: 'leathertr', texture: 'leathertr' },
        { model: 'leathertr', texture: 'leathertrchaps' },
        { model: 'legs', texture: 'legsblack' },
        { model: 'legs', texture: 'legsheart' },
        { model: 'shorts', texture: 'cutoffchinos' },
        // { model: 'shorts', texture: 'cutoffchinosblue' },
        { model: 'shorts', texture: 'cutoffdenims' },
        { model: 'shorts', texture: 'shortsgang' },
        { model: 'shorts', texture: 'shortsgrey' },
        { model: 'shorts', texture: 'shortskhaki' },
        { model: 'suit1tr', texture: 'suit1trblk' },
        // { model: 'suit1tr', texture: 'suit1trblk2' },
        { model: 'suit1tr', texture: 'suit1trblue' },
        { model: 'suit1tr', texture: 'suit1trgang' },
        { model: 'suit1tr', texture: 'suit1trgreen' },
        { model: 'suit1tr', texture: 'suit1trgrey' },
        { model: 'suit1tr', texture: 'suit1trred' },
        { model: 'suit1tr', texture: 'suit1tryellow' },
        { model: 'tracktr', texture: 'tracktrblue' },
        { model: 'tracktr', texture: 'shellsuittr' },
        { model: 'tracktr', texture: 'tracktr' },
        { model: 'tracktr', texture: 'tracktreris' },
        { model: 'tracktr', texture: 'tracktrgang' },
        { model: 'tracktr', texture: 'tracktrpro' },
        { model: 'tracktr', texture: 'tracktrwhstr' },
        { model: 'worktr', texture: 'worktrcamogrn' },
        { model: 'worktr', texture: 'worktrcamogry' },
        { model: 'worktr', texture: 'worktrgrey' },
        { model: 'worktr', texture: 'worktrkhaki' },
        { model: 'legs', texture: 'player_legs' },
    ],
    camOffset: [0.45, 1.95, 0.2],
    camRotation: [-0.05, 0, -0.2]
};
let shoes: Part = {
    id: 3,
    name: '#FEET',
    description: '#CHANGER',
    items: [
        { model: 'bask1', texture: 'bask1eris' },
        { model: 'bask1', texture: 'bask1problk' },
        { model: 'bask1', texture: 'bask1prowht' },
        { model: 'bask1', texture: 'bask2heatband' },
        { model: 'bask1', texture: 'bask2heatwht' },
        { model: 'bask1', texture: 'bask2semi' },
        { model: 'bask1', texture: 'hitop' },
        { model: 'bask1', texture: 'timberfawn' },
        { model: 'bask1', texture: 'timbergrey' },
        { model: 'bask1', texture: 'timberhike' },
        { model: 'bask1', texture: 'timberred' },
        { model: 'biker', texture: 'biker' },
        { model: 'biker', texture: 'boxingshoe' },
        { model: 'biker', texture: 'cowboyboot' },
        { model: 'biker', texture: 'cowboyboot2' },
        { model: 'biker', texture: 'snakeskin' },
        { model: 'conv', texture: 'convheatblk' },
        { model: 'conv', texture: 'convheatorn' },
        { model: 'conv', texture: 'convheatred' },
        { model: 'conv', texture: 'convproblk' },
        { model: 'conv', texture: 'convproblu' },
        { model: 'conv', texture: 'convprogrn' },
        { model: 'flipflop', texture: 'flipflop' },
        { model: 'flipflop', texture: 'sandal' },
        { model: 'flipflop', texture: 'sandalsock' },
        { model: 'shoe', texture: 'shoedressblk' },
        { model: 'shoe', texture: 'shoedressbrn' },
        { model: 'shoe', texture: 'shoespatz' },
        { model: 'sneaker', texture: 'sneakerbincblk' },
        { model: 'sneaker', texture: 'sneakerbincblu' },
        { model: 'sneaker', texture: 'sneakerbincgang' },
        { model: 'sneaker', texture: 'sneakerheatblk' },
        { model: 'sneaker', texture: 'sneakerheatgry' },
        { model: 'sneaker', texture: 'sneakerheatwht' },
        { model: 'sneaker', texture: 'sneakerproblu' },
        { model: 'sneaker', texture: 'sneakerprored' },
        { model: 'sneaker', texture: 'sneakerprowht' },
        { model: 'feet', texture: 'foot' },
    ],
    camOffset: [-0.25, 1.2, -0.25],
    camRotation: [0, -0.15, -0.9]
};
let chains: Part = {
    id: 13,
    name: '#CHAINS',
    description: '#CHANGER',
    items: [
        { model: 'neck', texture: 'dogtag' },
        { model: 'neck', texture: 'neckafrica' },
        { model: 'neck', texture: 'neckcross' },
        { model: 'neck', texture: 'neckdollar' },
        { model: 'neck', texture: 'neckhash' },
        { model: 'neck', texture: 'neckls' },
        { model: 'neck', texture: 'necksaints' },
        { model: 'neck', texture: 'stopwatch' },
        { model: 'neck2', texture: 'neckgold' },
        { model: 'neck2', texture: 'neckropeg' },
        { model: 'neck2', texture: 'neckropes' },
        { model: 'neck2', texture: 'necksilver' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [0.1, 0.75, 0.35],
    camRotation: [0, 0.15, 0.4]
};
let watches: Part = {
    id: 14,
    name: '#WATCHES',
    description: '#CHANGER',
    items: [
        { model: 'watch', texture: 'watchcro' },
        { model: 'watch', texture: 'watchcro2' },
        { model: 'watch', texture: 'watchgno' },
        { model: 'watch', texture: 'watchgno2' },
        { model: 'watch', texture: 'watchpink' },
        { model: 'watch', texture: 'watchpro' },
        { model: 'watch', texture: 'watchpro2' },
        { model: 'watch', texture: 'watchsub1' },
        { model: 'watch', texture: 'watchsub2' },
        { model: 'watch', texture: 'watchyellow' },
        { model: 'watch', texture: 'watchzip1' },
        { model: 'watch', texture: 'watchzip2' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [-0.65, 0.25, 0.10],
    camRotation: [0.05, -0.10, -0.15]
};
let glasses: Part = {
    id: 15,
    name: '#SHADES',
    description: '#CHANGER',
    items: [
        { model: 'bandmask', texture: 'bandblack3' },
        { model: 'bandmask', texture: 'bandblue3' },
        { model: 'bandmask', texture: 'bandgang3' },
        { model: 'bandmask', texture: 'bandred3' },
        { model: 'eyepatch', texture: 'eyepatch' },
        { model: 'glasses01', texture: 'glasses01' },
        { model: 'glasses01', texture: 'glasses01dark' },
        { model: 'glasses03', texture: 'glasses03' },
        { model: 'glasses03', texture: 'glasses03blue' },
        { model: 'glasses03', texture: 'glasses03dark' },
        { model: 'glasses03', texture: 'glasses03red' },
        { model: 'glasses03', texture: 'glasses05' },
        { model: 'glasses03', texture: 'glasses05dark' },
        { model: 'glasses04', texture: 'glasses04' },
        { model: 'glasses04', texture: 'glasses04dark' },
        { model: 'grouchos', texture: 'groucho' },
        { model: 'zorromask', texture: 'zorro' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [0.1, 0.6, 0.6],
    camRotation: [0, 0.1, 0.7]
};
let hats: Part = {
    id: 16,
    name: '#HATS',
    description: '#CHANGER',
    items: [
        { model: 'bandana', texture: 'bandblack' },
        { model: 'bandana', texture: 'bandblue' },
        { model: 'bandana', texture: 'bandgang' },
        { model: 'bandana', texture: 'bandred' },
        { model: 'bandknots', texture: 'bandblack2' },
        { model: 'bandknots', texture: 'bandblue2' },
        { model: 'bandknots', texture: 'bandgang2' },
        { model: 'bandknots', texture: 'bandred2' },
        { model: 'beret', texture: 'beretblk' },
        { model: 'beret', texture: 'beretred' },
        { model: 'bikerhelmet', texture: 'bikerhelmet' },
        { model: 'boater', texture: 'boater' },
        { model: 'boater', texture: 'boaterblk' },
        { model: 'bowler', texture: 'bowler' },
        { model: 'bowler', texture: 'bowlerblue' },
        { model: 'bowler', texture: 'bowlergang' },
        { model: 'bowler', texture: 'bowlerred' },
        { model: 'bowler', texture: 'bowleryellow' },
        { model: 'boxingcap', texture: 'boxingcap' },
        { model: 'cap', texture: 'capblk' },
        { model: 'cap', texture: 'capblue' },
        { model: 'cap', texture: 'capgang' },
        { model: 'cap', texture: 'capred' },
        { model: 'cap', texture: 'capzip' },
        { model: 'capback', texture: 'capblkback' },
        { model: 'capback', texture: 'capblueback' },
        { model: 'capback', texture: 'capgangback' },
        { model: 'capback', texture: 'capredback' },
        { model: 'capback', texture: 'capzipback' },
        { model: 'capknit', texture: 'capknitgrn' },
        { model: 'capovereye', texture: 'capblkover' },
        { model: 'capovereye', texture: 'capblueover' },
        { model: 'capovereye', texture: 'capgangover' },
        { model: 'capovereye', texture: 'capredover' },
        { model: 'capovereye', texture: 'capzipover' },
        { model: 'caprimup', texture: 'capblkup' },
        { model: 'caprimup', texture: 'capblueup' },
        { model: 'caprimup', texture: 'capgangup' },
        { model: 'caprimup', texture: 'capredup' },
        { model: 'caprimup', texture: 'capzipup' },
        { model: 'capside', texture: 'capblkside' },
        { model: 'capside', texture: 'capblueside' },
        { model: 'capside', texture: 'capgangside' },
        { model: 'capside', texture: 'capredside' },
        { model: 'capside', texture: 'capzipside' },
        { model: 'captruck', texture: 'captruck' },
        { model: 'cowboy', texture: 'cowboy' },
        { model: 'cowboy', texture: 'hattiger' },
        { model: 'hatmanc', texture: 'hatmancblk' },
        { model: 'hatmanc', texture: 'hatmancplaid' },
        { model: 'helmet', texture: 'helmet' },
        { model: 'hockeymask', texture: 'hockey' },
        { model: 'moto', texture: 'moto' },
        { model: 'skullycap', texture: 'skullyblk' },
        { model: 'skullycap', texture: 'skullygrn' },
        { model: 'trilby', texture: 'trilbydrk' },
        { model: 'trilby', texture: 'trilbylght' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [-0.25, 0.75, 0.8],
    camRotation: [0, 0.1, 0.7]
};
let special: Part = {
    id: 17,
    name: '#SHOP7',
    description: '#CHANGER',
    items: [
        { model: 'balaclava', texture: 'balaclava' },
        { model: 'countrytr', texture: 'countrytr' },
        { model: 'garagetr', texture: 'garageleg' },
        { model: 'gimpleg', texture: 'gimpleg' },
        { model: 'medictr', texture: 'medictr' },
        { model: 'pimptr', texture: 'pimptr' },
        { model: 'policetr', texture: 'policetr' },
        { model: 'valet', texture: 'croupier' },
        { model: 'valet', texture: 'valet' },
        { model: undefined, texture: undefined },
    ],
    camOffset: [-0.5, 3.3, 0.9],
    camRotation: [0, 0, 0.3]
};

// Haircuts
let haircut: Part = {
    id: 1,
    name: '#HAIRSTY',
    description: '#HAIRCHO',
    items: [
        { model: 'afro', texture: 'afro' },
        { model: 'afro', texture: 'afrobeard' },
        { model: 'afro', texture: 'afroblond' },
        { model: 'afro', texture: 'afrogoatee' },
        { model: 'afro', texture: 'afrotash' },
        { model: 'cornrows', texture: 'cornrows' },
        { model: 'cornrows', texture: 'cornrowsb' },
        { model: 'elvishair', texture: 'elvishair' },
        { model: 'flattop', texture: 'flattop' },
        { model: 'groovecut', texture: 'groovecut' },
        { model: 'head', texture: 'bald' },
        { model: 'head', texture: 'baldbeard' },
        { model: 'head', texture: 'baldgoatee' },
        { model: 'head', texture: 'baldtash' },
        { model: 'head', texture: 'beard' },
        { model: 'head', texture: 'goatee' },
        { model: 'head', texture: 'hairblond' },
        { model: 'head', texture: 'hairblue' },
        { model: 'head', texture: 'hairgreen' },
        { model: 'head', texture: 'hairpink' },
        { model: 'Head', texture: 'hairred' },
        { model: 'head', texture: 'highfade' },
        { model: 'head', texture: 'player_face' },
        { model: 'head', texture: 'tash' },
        { model: 'highafro', texture: 'highafro' },
        { model: 'jheri', texture: 'jhericurl' },
        { model: 'mohawk', texture: 'mohawk' },
        { model: 'mohawk', texture: 'mohawkbeard' },
        { model: 'mohawk', texture: 'mohawkblond' },
        { model: 'mohawk', texture: 'mohawkpink' },
        { model: 'slope', texture: 'slope' },
        { model: 'tramline', texture: 'tramline' },
        { model: 'wedge', texture: 'wedge' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [16, 17],
    camOffset: [-0.3, 0.75, 0.75],
    camRotation: [0.10, -0.20, 0.75]
};

// Tattoos
let leftUpperArm: Part = {
    id: 4,
    name: '#LARMTP',
    description: '#LG_36',
    items: [
        { model: '4RIP', texture: '4rip' },
        { model: '4SPIDER', texture: '4spider' },
        { model: '4WEED', texture: '4weed' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [-0.75, 0.05, 0.5],
    camRotation: [0, -0.05, 0.45]
};
let leftLowerArm: Part = {
    id: 5,
    name: '#LARMLW',
    description: '#LG_36',
    items: [
        { model: '5CROSS', texture: '5cross' },
        { model: '5CROSS2', texture: '5cross2' },
        { model: '5CROSS3', texture: '5cross3' },
        { model: '5GUN', texture: '5gun' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [-0.85, 0.1, 0.35],
    camRotation: [0, 0, 0]
};
let rightUpperArm: Part = {
    id: 6,
    name: '#RARMTP',
    description: '#LG_36',
    items: [
        { model: '6AFRICA', texture: '6africa' },
        { model: '6AZTEC', texture: '6aztec' },
        { model: '6CLOWN', texture: '6clown' },
        { model: '6CROWN', texture: '6crown' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0.75, 0.05, 0.5],
    camRotation: [0, -0.05, 0.45]
};
let rightLowerArm: Part = {
    id: 7,
    name: '#RARMLW',
    description: '#LG_36',
    items: [
        { model: '7CROSS', texture: '7cross' },
        { model: '7CROSS2', texture: '7cross2' },
        { model: '7CROSS3', texture: '7cross3' },
        { model: '7MARY', texture: '7mary' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0.85, 0.1, 0.35],
    camRotation: [0, 0, 0]
};
let leftChest: Part = {
    id: 9,
    name: '#LCHEST',
    description: '#LG_36',
    items: [
        { model: '9BULLT', texture: '9bullet' },
        { model: '9CROWN', texture: '9crown' },
        { model: '9GUN', texture: '9gun' },
        { model: '9GUN2', texture: '9gun2' },
        { model: '9HOMBY', texture: '9homeboy' },
        { model: '9RASTA', texture: '9rasta' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [-0.15, 0.75, 0.5],
    camRotation: [-0.05, 0, 0.5]
};
let rightChest: Part = {
    id: 10,
    name: '#RCHEST',
    description: '#LG_36',
    items: [
        { model: '10LS', texture: '10ls' },
        { model: '10LS2', texture: '10ls2' },
        { model: '10LS3', texture: '10ls3' },
        { model: '10LS4', texture: '10ls4' },
        { model: '10LS5', texture: '10ls5' },
        { model: '10OG', texture: '10og' },
        { model: '10WEED', texture: '10weed' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0.15, 0.75, 0.5],
    camRotation: [0.05, 0, 0.5]
};
let stomach: Part = {
    id: 11,
    name: '#BELLY',
    description: '#LG_36',
    items: [
        { model: '11DICE', texture: '11dice' },
        { model: '11DICE2', texture: '11dice2' },
        { model: '11GGIFT', texture: '11godsgift' },
        { model: '11GROV2', texture: '11grove2' },
        { model: '11GROV3', texture: '11grove3' },
        { model: '11GROVE', texture: '11grove' },
        { model: '11JAIL', texture: '11jail' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0, 0.75, 0.25],
    camRotation: [0, 0, 0.3]
};
let back: Part = {
    id: 8,
    name: '#BACK',
    description: '#LG_36',
    items: [
        { model: '8GUN', texture: '8gun' },
        { model: '8POKER', texture: '8poker' },
        { model: '8SA', texture: '8sa' },
        { model: '8SA2', texture: '8sa2' },
        { model: '8SA3', texture: '8sa3' },
        { model: '8SANTOS', texture: '8santos' },
        { model: '8WESTSD', texture: '8westside' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0, -0.75, 0.6],
    camRotation: [0, 0, 0.5]
};
let lowerBack: Part = {
    id: 12,
    name: '#LBACK',
    description: '#LG_36',
    items: [
        { model: '12ANGEL', texture: '12angels' },
        { model: '12BNDIT', texture: '12bandit' },
        { model: '12CROSS', texture: '12cross7' },
        { model: '12DAGER', texture: '12dagger' },
        { model: '12MAYBR', texture: '12mayabird' },
        { model: '12MYFAC', texture: '12mayaface' },
        { model: undefined, texture: undefined },
    ],
    clearBodyPart: [0, 17],
    camOffset: [0, -0.75, 0.25],
    camRotation: [0, 0, 0.3]
};

let body: Part[] = [
    torso, legs, shoes, chains, watches, glasses,
    hats, special, haircut, leftUpperArm, leftLowerArm, rightUpperArm,
    rightLowerArm, leftChest, rightChest, stomach, back, lowerBack
];

body.forEach(p => {
    p.menu = new SimpleMenu(p.name, p.items.map(i => ({
        before: function () {
            if (i.model !== undefined && i.texture !== undefined) {
                plr.giveClothesOutsideShop(i.texture, i.model, p.id);
            } else {
                plr.giveClothes(0, 0, p.id);
            }
            plr.buildModel();
        }
    })), {
        disableControls: true,
        exitOnDeathArrest: true,
        exitOnEnterCarButton: true
    });
});

let apparel: SimpleMenu = new SimpleMenu('~s~Quick body~n~by ~y~Vital', body.map(p => ({
    name: p.name,
    description: p.description,
    before: function () {
        Camera.DoFade(100, 0);
        while (Camera.GetFadingStatus()) {
            wait(0);
        }
        Camera.AttachToChar(plc, ...p.camOffset, ...p.camRotation, 0, 2);
        Camera.DoFade(100, 1);
        while (Camera.GetFadingStatus()) {
            wait(0);
        }
    },
    confirm: function () {
        if (p.clearBodyPart) {
            p.clearBodyPart.forEach(p => plr.giveClothes(0, 0, p));
            plr.buildModel();
        }
        while (p.menu.show()) {
            wait(0);
        }
    }
})), {
    addHelp: true,
    disableHud: true,
    disableControls: true,
    exitOnDeathArrest: true,
    exitOnEnterCarButton: true
});

apparel.options[0].before = function () {
    Camera.Restore();
}

while (true) {
    wait(0);

    if (plr.isPlaying() && Pad.TestCheat('BODY')) {
        plc.hideWeaponForScriptedCutscene(true);

        while (apparel.show()) {
            wait(0);
        }

        plc.hideWeaponForScriptedCutscene(false);
        Camera.Restore();
    }
}