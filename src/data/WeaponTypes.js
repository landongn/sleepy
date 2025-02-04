import {
    DMG_TYPE_BLUDGEONING,
    DMG_TYPE_PIERCING,
    DMG_TYPE_SLASHING,
} from './DamageTypes';
import {
    WPN_FAMILY_AXE,
    WPN_FAMILY_BLADE,
    WPN_FAMILY_HAMMER,
    WPN_FAMILY_POLEARM,
} from './WeaponFamilies';
import WpnTypeBattleAxe from './weapons/WpnTypeBattleAxe';
import WpnTypeFangs from './weapons/WpnTypeFangs';
import WpnTypeClaw from './weapons/WpnTypeClaw';
import WpnTypeGreatsword from './weapons/WpnTypeGreatsword';
import WpnTypeMace from './weapons/WpnTypeMace';
import WpnTypeShortsword from './weapons/WpnTypeShortsword';
import WpnTypeUnarmed from './weapons/WpnTypeUnarmed';

// hammer family
export const WPN_TYPE_WAR_HAMMER = 'WPN_TYPE_WAR_HAMMER';
export const WPN_TYPE_SLEDGE_HAMMER = 'WPN_TYPE_SLEDGE_HAMMER';
// cudgel family
export const WPN_TYPE_CLUB = 'WPN_TYPE_CLUB';
export const WPN_TYPE_MACE = 'WPN_TYPE_MACE';
// axe family
export const WPN_TYPE_HEAVY_AXE = 'WPN_TYPE_HEAVY_AXE';
export const WPN_TYPE_BATTLE_AXE = 'WPN_TYPE_BATTLE_AXE';
// blade family
export const WPN_TYPE_GREATSWORD = 'WPN_TYPE_GREATSWORD';
export const WPN_TYPE_SHORTSWORD = 'WPN_TYPE_SHORTSWORD';
export const WPN_TYPE_DAGGER = 'WPN_TYPE_DAGGER';
// polearm family
export const WPN_TYPE_STAFF = 'WPN_TYPE_STAFF';
export const WPN_TYPE_HALBERD = 'WPN_TYPE_HALBERD';
export const WPN_TYPE_JAVELIN = 'WPN_TYPE_JAVELIN';
// unarmed family
export const WPN_TYPE_UNARMED = 'WPN_TYPE_UNARMED';
export const WPN_TYPE_FANGS = 'WPN_TYPE_FANGS';
export const WPN_TYPE_CLAW = 'WPN_TYPE_CLAW';

const lookup = {
    [WPN_TYPE_UNARMED]: new WpnTypeUnarmed(),
    [WPN_TYPE_FANGS]: new WpnTypeFangs(),
    [WPN_TYPE_CLAW]: new WpnTypeClaw(),
    [WPN_TYPE_WAR_HAMMER]: {
        name: 'War hammer',
        family: WPN_FAMILY_HAMMER,
        key: WPN_TYPE_WAR_HAMMER,
        damageType: DMG_TYPE_BLUDGEONING,
    },
    [WPN_TYPE_SLEDGE_HAMMER]: {
        name: 'Sledge hammer',
        family: WPN_FAMILY_HAMMER,
        key: WPN_TYPE_SLEDGE_HAMMER,
        damageType: DMG_TYPE_BLUDGEONING,
    },
    [WPN_TYPE_CLUB]: {
        name: 'Club',
        family: WPN_FAMILY_HAMMER,
        key: WPN_TYPE_CLUB,
        damageType: DMG_TYPE_BLUDGEONING,
    },
    [WPN_TYPE_MACE]: {
        name: 'Mace',
        family: WPN_FAMILY_HAMMER,
        key: WPN_TYPE_MACE,
        damageType: DMG_TYPE_BLUDGEONING,
    },
    [WPN_TYPE_HEAVY_AXE]: {
        name: 'Heavy axe',
        family: WPN_FAMILY_AXE,
        key: WPN_TYPE_HEAVY_AXE,
        damageType: DMG_TYPE_SLASHING,
    },
    [WPN_TYPE_BATTLE_AXE]: new WpnTypeBattleAxe(),
    [WPN_TYPE_GREATSWORD]: new WpnTypeGreatsword(),
    [WPN_TYPE_SHORTSWORD]: new WpnTypeShortsword(),
    [WPN_TYPE_MACE]: new WpnTypeMace(),
    [WPN_TYPE_DAGGER]: {
        name: 'Dagger',
        family: WPN_FAMILY_BLADE,
        key: WPN_TYPE_DAGGER,
        damageType: DMG_TYPE_SLASHING,
    },
    [WPN_TYPE_STAFF]: {
        name: 'Staff',
        family: WPN_FAMILY_POLEARM,
        key: WPN_TYPE_STAFF,
        damageType: DMG_TYPE_BLUDGEONING,
    },
    [WPN_TYPE_HALBERD]: {
        name: 'Halberd',
        family: WPN_FAMILY_POLEARM,
        key: WPN_TYPE_HALBERD,
        damageType: DMG_TYPE_PIERCING,
    },
    [WPN_TYPE_JAVELIN]: {
        name: 'Javelin',
        family: WPN_FAMILY_POLEARM,
        key: WPN_TYPE_JAVELIN,
        damageType: DMG_TYPE_PIERCING,
    },
};

export const getWeaponType = (type) => lookup[type];
export const getWeaponTypeName = (type) => lookup[type].name;
export const getWeaponTypeFamily = (type) => lookup[type].family;
export const getWeaponTypeDmgType = (type) => lookup[type].damageType;
