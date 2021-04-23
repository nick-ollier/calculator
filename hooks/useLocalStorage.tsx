import { useState, useEffect, useLayoutEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    useLayoutEffect(() => {
        const localValue = localStorage.getItem(key);

        if (localValue !== null) {
            setValue(JSON.parse(localValue));
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
