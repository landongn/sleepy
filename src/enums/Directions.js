const directions = [
    {
        key: 0,
        shortName: 'NW',
        fullName: 'Northwest',
        delta: {
            x: -1,
            y: -1,
        },
    },
    {
        key: 1,
        shortName: 'N',
        fullName: 'North',
        delta: {
            x: 0,
            y: -1,
        },
    },
    {
        key: 2,
        shortName: 'NE',
        fullName: 'Northeast',
        delta: {
            x: 1,
            y: -1,
        },
    },
    {
        key: 3,
        shortName: 'W',
        fullName: 'West',
        delta: {
            x: -1,
            y: 0,
        },
    },
    {
        key: 4,
        shortName: 'Z',
        fullName: 'Here',
        delta: {
            x: 0,
            y: 0,
        },
    },
    {
        key: 5,
        shortName: 'E',
        fullName: 'East',
        delta: {
            x: 1,
            y: 0,
        },
    },
    {
        key: 6,
        shortName: 'SW',
        fullName: 'Southwest',
        delta: {
            x: -1,
            y: 1,
        },
    },
    {
        key: 7,
        shortName: 'S',
        fullName: 'South',
        delta: {
            x: 0,
            y: 1,
        },
    },
    {
        key: 8,
        shortName: 'SE',
        fullName: 'Southeast',
        delta: {
            x: 1,
            y: 1,
        },
    },
];

export const NW = 0;
export const N = 1;
export const NE = 2;
export const W = 3;
export const Z = 4;
export const E = 5;
export const SW = 6;
export const S = 7;
export const SE = 8;

export const shortName = (direction) => directions[direction].shortName;

export const fullName = (direction) => directions[direction].fullName;

export const delta = (direction) => directions[direction].delta;
