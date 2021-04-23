import { keypadScientific } from './keypadScientific';
import { keypadDefault } from './keypadDefault';

export const keypadExtended = (() => {
    const ext = [];
    const sci = Array.from(keypadScientific);
    const def = Array.from(keypadDefault);
    while (sci.length || def.length) {
        ext.push(...sci.splice(0, 6));
        ext.push(...def.splice(0, 4));
    }
    return ext;
})();
