import RaceData from './RaceData';

export const RACE_HUMAN = 'RACE_HUMAN';
export const RACE_GOBLIN = 'RACE_GOBLIN';
export const RACE_SNAKE = 'RACE_SNAKE';
export const RACE_BEAR = 'RACE_BEAR';

const lookup = {
    [RACE_HUMAN]: new RaceData({
        name: 'Human',
        key: RACE_HUMAN,
        speed: 1,
        STAT_STRENGTH: 1,
        STAT_FINESSE: 1,
        STAT_ATHLETICISM: 1,
        STAT_TRICKERY: 1,
        STAT_FAITH: 0,
    }),
    [RACE_GOBLIN]: new RaceData({
        name: 'Goblin',
        key: RACE_GOBLIN,
        speed: 2,
        STAT_STRENGTH: -1,
        STAT_FINESSE: 2,
        STAT_ATHLETICISM: 1,
        STAT_TRICKERY: 2,
        STAT_FAITH: 0,
    }),
    [RACE_SNAKE]: new RaceData({
        name: 'Snake',
        key: RACE_SNAKE,
        speed: 2,
        STAT_STRENGTH: -2,
        STAT_FINESSE: 3,
        STAT_ATHLETICISM: -1,
        STAT_TRICKERY: 3,
        STAT_FAITH: 0,
    }),
    [RACE_BEAR]: new RaceData({
        name: 'Bear',
        key: RACE_BEAR,
        speed: 2,
        STAT_STRENGTH: 5,
        STAT_FINESSE: -1,
        STAT_ATHLETICISM: 5,
        STAT_TRICKERY: -2,
        STAT_FAITH: -2,
    }),
};

export const getRaceData = (name) => lookup[name];
