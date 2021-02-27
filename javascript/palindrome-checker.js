JS
function palindrome(str) {
  let arr = str.toLowerCase().split('');
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if(/[a-zA-Z0-9]/.test(arr[i])) newArr.push(arr[i]);
  }
  let reverse = [...newArr].reverse();
  console.log(newArr)
  console.log(reverse)

  for (let i = 0; i < newArr.length; i++) {
    if(newArr[i] != reverse[i]) return false;
  }
  return true;
}
