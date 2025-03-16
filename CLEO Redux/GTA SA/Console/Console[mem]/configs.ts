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
    }
];