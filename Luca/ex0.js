replaceString = (strings) => {
  return strings.map(s => {
    if (s.length < 2) return "";
    return s[0] + s[1] + s[s.length - 2] + s[s.length - 1];
  })
}

console.log(replaceString(["spring", "ciao", "ma", "astronauti", "a"]));