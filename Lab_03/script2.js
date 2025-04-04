let generateBtn = document.getElementById("generate");

var minLenght = 0;
var maxLenght = 0;
bigLetters = false;
specialSigns = false;
var passwordLength = 0;

generateBtn.addEventListener("click", function () {
  minLenght = parseInt(document.getElementById("minLenght").value, 10);
  maxLenght = parseInt(document.getElementById("maxLenght").value, 10);
  bigLetters = document.getElementById("bigLetters").checked;
  specialSigns = document.getElementById("specialLetters").checked;
  passwordLength =
    Math.floor(Math.random() * (maxLenght - minLenght + 1)) + minLenght;
  generatePassword();
});

function generatePassword() {
  charsetWithCapitals =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  charsetWithCapitalsAndSpecials =
    "!@#$%^&*()-_=+|[]{};:/?.>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  retVal = "";

  for (var i = 0; i < passwordLength; ++i) {
    if (!specialSigns) {
      retVal += charsetWithCapitals.charAt(
        Math.floor(Math.random() * charsetWithCapitals.length)
      );
    } else {
      retVal += charsetWithCapitalsAndSpecials.charAt(
        Math.floor(Math.random() * charsetWithCapitalsAndSpecials.length)
      );
    }
  }

  if (!bigLetters) {
    retVal = retVal.toLocaleLowerCase();
  }
  alert(retVal);
}
