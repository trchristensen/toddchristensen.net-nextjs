export function convertToF(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

// export function isDefined(x: any, ifYes: Function, ifNo: Function) {
//   if (typeof x != "undefined") {
//     return ifYes(x);
//   } else {
//     return ifNo ? ifNo(x) : null;
//   }
// }


export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
