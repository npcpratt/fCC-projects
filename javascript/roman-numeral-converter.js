function convertToRoman(num) {
  let arr = "".concat(num).split('').reverse();
  let romanArray = [];
  for (let i = 0; i < arr.length; i++) {
    if(i == 0) {
      if(arr[i] == 1) romanArray.unshift('I');
      if(arr[i] == 2) romanArray.unshift('II');
      if(arr[i] == 3) romanArray.unshift('III');
      if(arr[i] == 4) romanArray.unshift('IV');
      if(arr[i] == 5) romanArray.unshift('V');
      if(arr[i] == 6) romanArray.unshift('VI');
      if(arr[i] == 7) romanArray.unshift('VII');
      if(arr[i] == 8) romanArray.unshift('VIII');
      if(arr[i] == 9) romanArray.unshift('IX');
    }
    if(i == 1) {
      if(arr[i] == 1) romanArray.unshift('X');
      if(arr[i] == 2) romanArray.unshift('XX');
      if(arr[i] == 3) romanArray.unshift('XXX');
      if(arr[i] == 4) romanArray.unshift('XL');
      if(arr[i] == 5) romanArray.unshift('L');
      if(arr[i] == 6) romanArray.unshift('LX');
      if(arr[i] == 7) romanArray.unshift('LXX');
      if(arr[i] == 8) romanArray.unshift('LXXX');
      if(arr[i] == 9) romanArray.unshift('XC');
    }
    if(i == 2) {
      if(arr[i] == 1) romanArray.unshift('C');
      if(arr[i] == 2) romanArray.unshift('CC');
      if(arr[i] == 3) romanArray.unshift('CCC');
      if(arr[i] == 4) romanArray.unshift('CD');
      if(arr[i] == 5) romanArray.unshift('D');
      if(arr[i] == 6) romanArray.unshift('DC');
      if(arr[i] == 7) romanArray.unshift('DCC');
      if(arr[i] == 8) romanArray.unshift('DCCC');
      if(arr[i] == 9) romanArray.unshift('CM');
    }
    if(i == 3) {
      if(arr[i] == 1) romanArray.unshift('M');
      if(arr[i] == 2) romanArray.unshift('MM');
      if(arr[i] == 3) romanArray.unshift('MMM');
    }
  }
  return romanArray.join('');
}

convertToRoman(36);
