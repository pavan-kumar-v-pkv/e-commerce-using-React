import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe('formatMoney', () => {
    it('formats 1999 cents to "$19.99"', () => {
        expect(formatMoney(1999)).toBe("$19.99");
    });

    it('displays two decimal places for whole dollars', () => {
        expect(formatMoney(1090)).toBe("$10.90");
        expect(formatMoney(5000)).toBe("$50.00");
    });
});
