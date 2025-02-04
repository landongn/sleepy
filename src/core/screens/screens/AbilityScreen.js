import Screen from './Screen';
import {
    INPUT_CMD_CONFIRM,
    INPUT_CMD_CANCEL,
    INPUT_CMD_MOVE_N,
    INPUT_CMD_MOVE_S,
} from '../../input/InputCommandType';
import { INPUT_DOMAIN_MAIN_MENU } from '../../input/InputDomainType';
import SelectableList from '../../../utils/SelectableList';
import { drawUIWindow } from '../../../utils/UIWindowUtil';
import {
    getAbility,
    getAbilityStatus,
    getStance,
} from '../../../data/Abilities';
import { getAbilityTypeName } from '../../../enums/AbilityTypes';
import { SCREEN_CHANNEL, SCREEN_CONFIRM } from '../ScreenType';

export default class AbilityScreen extends Screen {
    width = 18;
    PADDING_RIGHT = 1;
    PADDING_HEIGHT = 4;
    character;
    list = new SelectableList();

    get left() {
        return Math.floor(
            this.game.camera.width - this.width - this.PADDING_RIGHT
        );
    }

    get top() {
        return this.PADDING_HEIGHT;
    }

    get height() {
        return Math.floor(this.game.camera.height - this.PADDING_HEIGHT * 2);
    }

    onEnter(ctx) {
        this.game.commands.pushDomain(INPUT_DOMAIN_MAIN_MENU);
        this.character = ctx.character;

        this.refreshList();
    }

    refreshList() {
        const evt = this.character.fireEvent('query-abilities', {
            abilities: [],
        });

        this.list.setItems([
            ...evt.data.abilities.map((type) => getAbility(type)),
            {
                name: 'Back',
                isBack: true,
            },
        ]);
    }

    onLeave() {
        this.game.commands.popDomain(INPUT_DOMAIN_MAIN_MENU);
    }

    selectItem() {
        const ability = this.list.selected;

        if (ability.isBack) {
            this.game.screens.popScreen();
            return;
        }

        const status = getAbilityStatus(ability.key, this.character);

        // is the ability on cooldown? IGNORE IT
        if (status && status.isCoolingDown) {
            return;
        }

        // is the ability toggled on?
        if (status && status.isToggledOn) {
            ability.toggleOff(this.character, status);
            this.game.screens.popScreen();
            return;
        }

        // is the ability a stance?
        if (ability.isStance) {
            const stance = getStance(this.character);

            if (stance) {
                this.game.screens.pushScreen(SCREEN_CONFIRM, {
                    header: 'Switch stance?',
                    leadText: `Only one stance can be active at a time. Do you want to switch from ${stance.ability.name} to ${ability.name}?`,
                    onConfirm: () => {
                        stance.ability.toggleOff(this.character, stance);
                        ability.toggleOn(this.character);
                        this.game.screens.popScreen();
                    },
                });
                return;
            }
        }

        if (!status && ability.isToggleable) {
            ability.toggleOn(this.character);
            this.game.screens.popScreen();
            return;
        }

        ability.initiate(this.character, {
            onConfirm: (data) => {
                ability.execute(this.character, data);

                this.game.screens.popScreen();

                if (ability.isChanneled && this.character.isPlayer) {
                    this.game.screens.pushScreen(SCREEN_CHANNEL, {
                        entity: this.character,
                    });
                }
            },
            onCancel: () => {},
        });
    }

    handleInput() {
        const cmd = this.game.commands.getNextCommand();

        if (!cmd) {
            return;
        }

        if (cmd.type === INPUT_CMD_CANCEL) {
            this.game.screens.popScreen();
        }

        if (cmd.type === INPUT_CMD_MOVE_N) {
            this.list.up();
        }

        if (cmd.type === INPUT_CMD_MOVE_S) {
            this.list.down();
        }

        if (cmd.type === INPUT_CMD_CONFIRM) {
            this.selectItem();
        }
    }

    onUpdate(dt) {
        this.game.updateAdventureSystems(dt);
        this.handleInput();

        drawUIWindow(
            this.left,
            this.top,
            this.width,
            this.height,
            'Abilities',
            this.character.glyph
        );

        let yOffset = this.top + 2;
        let xOffset = this.left + 2;

        this.list.data.forEach(({ item: ability, idx, isSelected }) => {
            if (ability.isBack) {
                if (isSelected) {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        '→ Back',
                        'yellow'
                    );
                } else {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        '- Back'
                    );
                }
                return;
            }

            const display = ability.getDisplayText(this.character);

            if (isSelected) {
                if (display.isEnabled) {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        `→ ${display.text}`,
                        'yellow'
                    );
                } else {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        `→ ${display.text}`,
                        'gray'
                    );
                }
            } else {
                if (display.isEnabled) {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        `- ${display.text}`
                    );
                } else {
                    this.game.renderer.drawText(
                        xOffset,
                        yOffset + idx,
                        `- ${display.text}`,
                        'gray'
                    );
                }
            }
        });

        const ability = this.list.selected;

        if (ability.isBack) {
            return;
        }

        const description = `${getAbilityTypeName(
            ability.type
        )}. ${ability.getDescription(this.character)}`;

        this.game.renderer.drawTextWrapping(
            xOffset,
            yOffset + this.list.length + 1,
            this.width - 2,
            description
        );
    }
}
