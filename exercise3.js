function splitter(str, limit){
    let strs = [];
    while(str.length > limit){
        let pos = str.substring(0, limit).lastIndexOf(' ');
        pos = pos <= 0 ? limit : pos;
        strs.push(str.substring(0, pos));
        let i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+limit)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

function moveText(string, side, limit) {
  let stringToMove = string;
  while (stringToMove.length < limit) {
    if (side == "LEFT") {
      stringToMove += " ";
    } else {
      stringToMove = " " + stringToMove;
    }
  }
  return stringToMove;
}

function formatText(textArr, formatting, limit) {
  let firstLastString = "";
  let result = [];

  for (let count = 0; count <= limit + 1; count++) {
    firstLastString += "*";
  }
  result.push(firstLastString);

  for (let string = 0; string < textArr.length; string++) {
    let newString = "";
    for (let word = 0; word < textArr[string].length; word++) {
      newString += textArr[string][word];
      if (word !== textArr[string].length - 1) {
        newString += " ";
      }
    }
    if (newString.length < limit) {
      newString = moveText(newString, formatting[string], limit);
      let wrappedString = `*${newString}*`;
      result.push(wrappedString);
    } else {
      let newArr = splitter(newString, limit);
      for (let count = 0; count < newArr.length; count++) {
        newString = moveText(newArr[count], formatting[string], limit);
        let wrappedString = `*${newString}*`;
        result.push(wrappedString);
      }
    }
  }

  result.push(firstLastString);
  return result;
}

let text = [
  ["Hello", "world"],
  ["Brad", "came", "to", "dinner", "with", "us"],
  ["He", "loves", "tacos"]
];
let format = ["LEFT", "RIGHT", "LEFT"];
let charLimit = 16;

console.log(formatText(text, format, charLimit));
