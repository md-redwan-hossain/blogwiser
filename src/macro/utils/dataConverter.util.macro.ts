const dataUnitConverter = {
  megabyteToByte: function (desiredDataUnit: number): number {
    return 1024 * 1024 * Number(desiredDataUnit);
  }
};
export default dataUnitConverter;
