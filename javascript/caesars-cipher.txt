function rot13(str) {
  let arr = str.split('');
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  for (let i = 0; i < arr.length; i++) {
    if(/[A-Z]/.test(arr[i])) {
      let index = alphabet.indexOf(arr[i])
      if(index < 13) {
        arr[i] = alphabet[26 + (index - 13)]
      }
      else arr[i] = alphabet[index - 13]
    }
  }
  return arr.join('');
}

rot13("SERR PBQR PNZC");
