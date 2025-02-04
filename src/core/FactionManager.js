import { FactionMember } from '../ecs/components';
import {
    factions,
    FACTION_BEAR,
    FACTION_GOBLIN,
    FACTION_PLAYER,
    FACTION_SERPENT,
    FACTION_VILLAGER,
    getFactionByName,
} from '../enums/Factions';
import Manager from './Manager';

export default class FactionManager extends Manager {
    relations = {};

    get factions() {
        return Object.values(factions);
    }

    constructor(game) {
        super(game);

        this.setRelation(FACTION_PLAYER, FACTION_GOBLIN, -400);
        this.setRelation(FACTION_PLAYER, FACTION_VILLAGER, 300);
        this.setRelation(FACTION_PLAYER, FACTION_SERPENT, -250);
        this.setRelation(FACTION_PLAYER, FACTION_BEAR, -250);
        this.setRelation(FACTION_SERPENT, FACTION_VILLAGER, -300);
        this.setRelation(FACTION_SERPENT, FACTION_GOBLIN, 300);
        this.setRelation(FACTION_SERPENT, FACTION_BEAR, 300);
        this.setRelation(FACTION_GOBLIN, FACTION_VILLAGER, -400);
        this.setRelation(FACTION_BEAR, FACTION_VILLAGER, -400);
    }

    getFactionById(id) {
        return this.factions.find((f) => f.id === id);
    }

    getFactionByName(name) {
        return getFactionByName(name);
    }

    isHostile(factionA, factionB) {
        return factionA !== factionB;
    }

    _relationKey(idA, idB) {
        return [idA, idB].sort().join('-');
    }

    setRelation(idA, idB, value) {
        const key = this._relationKey(idA, idB);

        this.relations[key] = value;
    }

    getRelation(idA, idB) {
        const key = this._relationKey(idA, idB);

        if (!this.relations.hasOwnProperty(key)) {
            this.relations[key] = 0;
        }

        return this.relations[key];
    }

    getEntityRelation(entityA, entityB) {
        const memberA = entityA.get(FactionMember);
        const memberB = entityB.get(FactionMember);

        if (memberA && memberB) {
            const factionA = memberA.faction;
            const factionB = memberB.faction;

            return this.getRelation(factionA.id, factionB.id);
        }

        return 0;
    }

    areEntitiesHostile(entityA, entityB) {
        const relation = this.getEntityRelation(entityA, entityB);

        return relation < -200;
    }

    getDisplay(value) {
        if (value <= -300) {
            return 'Aggressive';
        }

        if (value <= -200) {
            return 'Unfriendly';
        }

        if (value >= 300) {
            return 'Loyal';
        }

        if (value >= 200) {
            return 'Friendly';
        }

        if (value >= 100) {
            return 'Amicable';
        }

        return 'Neutral';
    }

    getAttitudeGlyph(value) {
        if (value <= -200) {
            return {
                char: '☻',
                fg1: '#ca4444',
                fg2: '#411010',
            };
        }

        if (value >= 200) {
            return {
                char: '☺',
                fg1: '#78b478',
                fg2: '#1a251a',
            };
        }

        return {
            char: '♥',
            fg1: '#b9bcc2',
            fg2: '#222832',
        };
    }
}
