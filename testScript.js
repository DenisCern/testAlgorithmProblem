function GetResultFromArray() {
  var numbersForAvailable = form.availableArray.value;
  var numbersForAllowed = form.allowedArray.value;
  var numbersForPreferred = form.prefferedArray.value;

  //arrays initialization
  let available = new Array();
  let allowed = new Array();
  let preferred = new Array();

  //arrays filling
  available = numbersForAvailable.split(",").map(Number); //change type "String" in array to type "Number"
  available = bubble_Sort(available); //sort elements in array with "Bubble Sort"

  allowed = numbersForAllowed.split(",").map(Number); //change type "String" in array to type "Number"
  allowed = bubble_Sort(allowed); //sort elements in array with "Bubble Sort"

  preferred = numbersForPreferred.split(",").map(Number); //change type "String" in array to type "Number"
  preferred = bubble_Sort(preferred); //sort elements in array with "Bubble Sort"

  //jump into function "attempt"
  returnsArray = attempt(available, allowed, preferred);

  returnsArray = bubble_Sort(returnsArray);

  form.res.value = returnsArray;
}

function attempt(available, allowed, preferred) {
  let returns = new Array();
  var existNan = false;
  //make a array with the same values
  let overallArray = new Array();

  for (let al = 0; al < allowed.length; al++) {
    for (let av = 0; av < available.length; av++) {
      if (allowed[al] == available[av]) {
        overallArray.push(allowed[al]);
        break;
      } else if (Number.isNaN(allowed[al]) == true) {
        available.forEach(function (item, i, available) {
          overallArray.push(item);
          existNan = true;
        });

        break;
      }
    }
  }

  preferred.forEach(function (item, i, preferred) {
    if (Number.isNaN(preferred[i]) == true) {
      allowed.forEach(function (item, i, allowed) {
        preferred.push(item);
      });
    }
  });

  //algorithm checks
  //overallArray.reverse();
  for (let p = 0; p < preferred.length; p++) {
    for (let ov = 0; ov < overallArray.length; ov++) {
      if (preferred[p] == overallArray[ov]) {
        returns.push(overallArray[ov]);
        overallArray.splice(ov, 1);
        break;
      }
    }
  }
  if (returns.length != preferred.length) {
    for (let p = 0; p < preferred.length; p++) {
      for (let ov = 0; ov < overallArray.length; ov++) {
        if (preferred[p] != overallArray[ov]) {
          if (existNan == true) {
            overallArray.reverse();
          }
          for (let i = 0; i < overallArray.length; i++) {
            if (preferred[p] < overallArray[i]) {
              returns.push(overallArray[ov]);
              break;
            } else if (preferred[p] > overallArray[i]) {
              returns.push(overallArray[ov]);
              break;
            }
          }
          break;
        }
      }
    }
  }

  for (var q = 1, i = 1; q < returns.length; ++q) {
    if (returns[q] !== returns[q - 1]) {
      returns[i++] = returns[q];
    }
  }

  returns.length = i;

  return returns;
}

function bubble_Sort(a) {
  var swapp;
  var n = a.length - 1;
  var x = a;
  do {
    swapp = false;
    for (var i = 0; i < n; i++) {
      if (x[i] > x[i + 1]) {
        var temp = x[i];
        x[i] = x[i + 1];
        x[i + 1] = temp;
        swapp = true;
      }
    }
    n--;
  } while (swapp);
  return x;
}
