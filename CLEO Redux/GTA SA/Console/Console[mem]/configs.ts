// Until I figure out how to load configs from separate files, they are all here.
export let configsInfo: {
    name: string,
    description: string,
    commands: string[]
}[] = [
    {
        name: 'Terminator',
        description: 'Invulnerability and heavy cars',
        commands: [
            'BULLETPROOF 1',
            'FIREPROOF 1',
            'EXPLOSIONPROOF 1',
            'COLLISIONPROOF 1',
            'MELEEPROOF 1',
            'CAR BULLETPROOF 1',
            'CAR FIREPROOF 1',
            'CAR EXPLOSIONPROOF 1',
            'CAR COLLISIONPROOF 1',
            'CAR MELEEPROOF 1',
            'TYRES BULLETPROOF 1',
            'PETROL TANK BULLETPROOF 1',
            'CAR HEAVY 1'
        ]
    },
    {
        name: 'Parkour master',
        description: 'Infinite stamina, no fall damage',
        commands: [
            'COLLISIONPROOF 1',
            'NEVER TIRED 1'
        ]
    },
    {
        name: 'Mere mortal',
        description: 'Clears all proofs and other cheats',
        commands: [
            'BULLETPROOF 0',
            'FIREPROOF 0',
            'EXPLOSIONPROOF 0',
            'COLLISIONPROOF 0',
            'MELEEPROOF 0',
            'NEVER TIRED 0',
            'CAR BULLETPROOF 0',
            'CAR FIREPROOF 0',
            'CAR EXPLOSIONPROOF 0',
            'CAR COLLISIONPROOF 0',
            'CAR MELEEPROOF 0',
            'TYRES BULLETPROOF 0',
            'PETROL TANK BULLETPROOF 0',
            'CAR HEAVY 0'
        ]
    },
    {
        name: 'Leave me alone',
        description: 'Clears wanted level and disables it',
        commands: [
            'WANTED 0',
            'MAX WANTED 0'
        ]
    },
    {
        name: 'Riot weapons',
        description: 'Weapons pack to start a riot',
        commands: [
            'WEAPON 5 1',
            'WEAPON 18 8',
            'WEAPON 22 102',
            'WEAPON 30 120',
            'WEAPON 33 40',
            'WEAPON 41 200'
        ]
    },
    {
        name: 'Psycho weapons',
        description: 'Weapons for the crazy ones',
        commands: [
            'WEAPON 9 1',
            'WEAPON 16 8',
            'WEAPON 26 50',
            'WEAPON 31 120',
            'WEAPON 38 300',
            'WEAPON 45 1'
        ]
    },
    {
        name: 'Secret agent weapons',
        description: 'Weapons for a stealthy operation',
        commands: [
            'WEAPON 4 1',
            'WEAPON 17 7',
            'WEAPON 23 119',
            'WEAPON 29 90',
            'WEAPON 34 30',
            'WEAPON 44 1'
        ]
    },
    {
        name: 'Empty streets',
        description: 'No pedestrians and traffic',
        commands: [
            'CLEAR AREA 100',
            'PED DENSITY 0',
            'CAR DENSITY 0'
        ]
    },
    {
        name: 'Living city',
        description: 'Reset pedestrians and traffic',
        commands: [
            'PED DENSITY 1',
            'CAR DENSITY 1'
        ]
    },
    {
        name: 'Hospitable military',
        description: 'Walk freely in restricted areas',
        commands: [
            'DISABLE MILITARY ZONES WANTED LEVEL 1',
            'AIRCRAFT CARRIER DEFENCE 0',
            'MILITARY BASE DEFENCE 0'
        ]
    },
    {
        name: 'Hostile military',
        description: 'Restricted areas are protected again',
        commands: [
            'DISABLE MILITARY ZONES WANTED LEVEL 0',
            'AIRCRAFT CARRIER DEFENCE 1',
            'MILITARY BASE DEFENCE 1'
        ]
    }
];