for (let i = 1; i <= 3; i++) {
  if (i === 2) {
    console.log("This is two");
  }
}

function Test(x) {
  return x * 5;
}
console.log(Test(5));

// D) Error
// Which approach is best for retrying a failed API call until success?
// *
// A) for loop with fixed limit
// B) while loop with condition
// C) switch statement
// D) if only

// How do you call a function in JavaScript?
// *
// A) function myFunc
// B) call myFunc
// C) myFunc()
// D) run myFunc

const add = (a) => (b) => a * b;
console.log(add(7)(6));

//Using Prompt window
let Telugu = Number(prompt("Enter Telugu markṣ"));
let Maths = Number(prompt("Enter Maths markṣ"));
let Social = Number(prompt("Enter Social markṣ"));
let Science = Number(prompt("Enter Science markṣ"));
let Hindi = Number(prompt("Enter Hindi markṣ"));

var total, Average, Message;
total = Telugu + Maths + Social + Science + Hindi;
Average = total / 5;

if (total > 0) {
  if (Average >= 90) {
    Message = "A+ [Excellent]";
  } else if (Average >= 80 && Average <= 89) {
    Message = "A [Very Good]";
  } else if (Average >= 80 && Average <= 89) {
    Message = "B [Good]";
  } else if (Average >= 70 && Average <= 79) {
    Message = "C [Above Average]";
  } else if (Average >= 60 && Average <= 69) {
    Message = "D [Average]";
  } else if (Average >= 50 && Average <= 59) {
    Message = "E [below Average]";
  } else if (Average <= 50) {
    Message = "F [Just Pass]";
  }
  console.log(
    "The student Y.Gayathri's Total Marks is =" +
      total + ","+
      "The overall Average = " + 
      Average + ","+
      "The student's Grade =" + 
      Message  +"."

    
  );
} else {
  console.log(
    "Total Marks is should not be lesser than 0 ,please enter valid marks"
  );
}
