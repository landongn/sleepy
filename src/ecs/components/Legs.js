import { Component } from 'geotic';
import { game } from '../../core/Game';
import { Blocker } from './Blocker';

export class Legs extends Component {
    onTryMove(evt) {
        const position = this.entity.position.getPos();
        const targetX = position.x + evt.data.x;
        const targetY = position.y + evt.data.y;

        const targetTileEntities = game.map.getEntitiesAt(targetX, targetY);

        if (targetTileEntities.some((entity) => entity.has(Blocker))) {
            return;
        }

        const nonHostile = targetTileEntities.find((entity) => {
            return (
                entity.factionMember &&
                !game.factions.areEntitiesHostile(entity, this.entity)
            );
        });

        // swap locations
        if (nonHostile) {
            nonHostile.position.setPos(position.x, position.y);
        }

        const speed = this.entity.stats.speed();
        const cost = (1 / speed) * 1000;

        this.entity.fireEvent('energy-consumed', cost);
        this.entity.position.setPos(targetX, targetY);

        evt.handle();
    }
}
