import { describe, expect, it, beforeEach } from "vitest";
import { name, store } from ".";
import * as strategies from "."

describe("storage", () => {
    beforeEach(() => window.localStorage.clear())

    it('sets and gets a value from localStorage', () => {
        const testStore = store<string>('test');
        testStore.set('hello');
        expect(testStore.get()).toBe('hello');
    });

    it('I wonder what it does for missing/undefined values', () => {
        const testStore = store<string>(undefined as any as string);
        testStore.set('hello');
        expect(testStore.get()).toBe('hello');
        // well, it works for undefined, what happens with null?
        const testStore2 = store<string>(null as any as string);
        expect(testStore2.get()).not.toBe('hello');
        testStore2.set('hello');
        expect(testStore2.get()).toBe('hello');
    });

    it('calls the onChange delegate when set is called', () => {
        const testStore = store<string>('test2');
        let delegateCalled = false;
        testStore.onChange(() => { delegateCalled = true });

        expect(delegateCalled).toBe(false);

        testStore.set('world');

        expect(delegateCalled).toBe(true);
    });

    it.each(["name", "filter"])
        ("[%s] reads strings, returns arrays", (value: string) => {
            const strategy = (strategies as any)[value]
            expect(strategy.get()).toEqual([])
            strategy.set("lala")
            expect(strategy.get()).toEqual(["lala"])
            strategy.set("la,la")
            expect(strategy.get()).toEqual(["la", "la"])
            strategy.set("la la,la;la")
            expect(strategy.get()).toEqual(["la la", "la;la"])
            strategy.set("la   ,   la   ")
            expect(strategy.get()).toEqual(["la", "la"])
        })

    it("totally bools the showInProgress and only sees false as false, everything else is true", () => {
        const {showInProgress} = strategies
        expect(showInProgress.get()).toBeTruthy()
        showInProgress.set("bla" as any as boolean)
        expect(showInProgress.get()).toBeTruthy()
        showInProgress.set(undefined as any as boolean)
        expect(showInProgress.get()).toBeTruthy()
        showInProgress.set([] as any as boolean)
        expect(showInProgress.get()).toBeTruthy()
        showInProgress.set("false" as any as boolean)
        expect(showInProgress.get()).toBeFalsy()
        showInProgress.set(false)
        expect(showInProgress.get()).toBeFalsy()
    })
})