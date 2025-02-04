import { getMessage, shouldAppear } from '../enums/ConsoleEvents';
import Manager from './Manager';

export default class ConsoleManager extends Manager {
    messages = [];
    events = [];
    consoleHeight = 4;

    teardown() {
        this.messages = [];
        this.events = [];
    }

    event(type, data) {
        this.events.push({ type, data });
    }

    log(text) {
        this.messages.push({ text });
    }

    render(dt) {
        this.events.forEach(({ type, data }) => {
            if (shouldAppear(type, data)) {
                this.messages.push({
                    text: getMessage(type, data),
                });
            }
        });
        this.events = [];

        const msgs = this.messages.slice(
            Math.max(this.messages.length - this.consoleHeight, 0)
        );
        const height = Math.min(msgs.length, this.consoleHeight);

        msgs.forEach((message, i) => {
            this.game.renderer.drawText(
                0,
                this.game.camera.height - (height - i),
                message.text
            );
        });
    }
}
