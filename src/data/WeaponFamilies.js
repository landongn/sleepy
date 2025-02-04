export const WPN_FAMILY_HAMMER = 'WPN_FAMILY_HAMMER';
export const WPN_FAMILY_AXE = 'WPN_FAMILY_AXE';
export const WPN_FAMILY_BLADE = 'WPN_FAMILY_BLADE';
export const WPN_FAMILY_ARCHERY = 'WPN_FAMILY_ARCHERY';
export const WPN_FAMILY_POLEARM = 'WPN_FAMILY_POLEARM';
export const WPN_FAMILY_UNARMED = 'WPN_FAMILY_UNARMED';
export const WPN_FAMILY_CUDGEL = 'WPN_FAMILY_CUDGEL';

const lookup = {
    [WPN_FAMILY_HAMMER]: {
        name: 'Hammer',
    },
    [WPN_FAMILY_AXE]: {
        name: 'Axe',
    },
    [WPN_FAMILY_BLADE]: {
        name: 'Blade',
    },
    [WPN_FAMILY_ARCHERY]: {
        name: 'Archery',
    },
    [WPN_FAMILY_POLEARM]: {
        name: 'Polearm',
    },
    [WPN_FAMILY_UNARMED]: {
        name: 'Unarmed',
    },
    [WPN_FAMILY_CUDGEL]: {
        name: 'Cudgel',
    },
};

export const getWeaponFamilyName = (family) => lookup[family].name;
