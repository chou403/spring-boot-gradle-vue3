import {App} from "vue";
const modules: Record<string, any> = import.meta.glob("./**/*.vue",{eager: true});

export const setGlobalComponent = (app:App) => {
    for (const [key, component] of Object.entries(modules)) {
        app.component(key.split('/')[1], component.default)
    }
}
