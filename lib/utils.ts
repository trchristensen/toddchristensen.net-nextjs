export function convertToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function isDefined(x: any, ifYes, ifNo = null) {
  if (typeof x != "undefined") {
    return ifYes(x);
  } else {
    return ifNo ? ifNo(x) : null;
  }
}
