import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('1')).toBeNaN();
    expect(convertPLNToUSD('-2')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('1a2e')).toBeNaN();
  });
  it('should return NaN when there is no input', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should return "Error" when input is neither string nor number', () => {
    expect(convertPLNToUSD(true)).toBe('Error');
    expect(convertPLNToUSD(false)).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
  });
});
