import { iTab } from '../interfaces/interfaces';

export class Tab {

    constructor(tab: iTab) {
        this.name = tab.name;
        this.href = tab.href;
        this.active = tab.active;
        this.badge = tab.badge;
    }

    get ariaControls(): string {
        return this.href.replace("#", "");
    }

    name: string;
    href: string;
    active: boolean;
    badge: number;
}