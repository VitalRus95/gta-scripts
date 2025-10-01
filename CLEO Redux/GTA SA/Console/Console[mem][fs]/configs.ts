//  Script by Vital (Vitaly Pavlovich Ulyanov)
// Until I figure out how to load configs from separate files, they are all here.
export let configsInfo: {
    name: string,
    description: string,
    commands: string[]
}[] = [
    {
        name: 'Terminator',
        description: 'Invulnerability for player and vehicles',
        commands: [
            'GOD 1',
            'TYRES BULLETPROOF 1',
            'PETROL TANK BULLETPROOF 1',
            'CAR HEAVY 1'
        ]
    },
    {
        name: 'Mere mortal',
        description: 'Clears all proofs and other cheats',
        commands: [
            'GOD 0',
            'TYRES BULLETPROOF 0',
            'PETROL TANK BULLETPROOF 0',
            'CAR HEAVY 0',
            'DEATH PENALTIES 1',
            'ARREST PENALTIES 1',
            'AIRCRAFT CARRIER DEFENCE 1',
            'MILITARY BASE DEFENCE 1',
            'DISABLE MILITARY ZONES WANTED LEVEL 0',
            'FREE RESPRAY 0'
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
        name: 'Empty streets',
        description: 'No pedestrians and traffic',
        commands: [
            'CLEAR AREA 500',
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
        name: 'Lose nothing',
        description: 'You keep your money and weapons after death and arrest',
        commands: [
            'DEATH PENALTIES 0',
            'ARREST PENALTIES 0'
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