export function toWei(value: string) {
  // convert hex string to decimal
  const dec = parseInt(value, 16);
  return dec;
}

export function toETD(value: string) {
  // convert hex string to decimal
  const dec = parseInt(value, 16);
  return dec / 1000000000000000000;
}
