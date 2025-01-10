// 'mousemove' event listener add kar rahe hain, jo tab trigger hoga jab user mouse move karega
document.addEventListener("mousemove", (event) => {
  // Eyes, pupils aur irises ko querySelector se select kar rahe hain (sab aankhon ke elements)
  const eyes = document.querySelectorAll(".eye");
  const pupils = document.querySelectorAll(".pupil");
  const irises = document.querySelectorAll(".iris");

  // Har eye ko iterate kar rahe hain
  eyes.forEach((eye, index) => {
    // Har eye ke corresponding pupil aur iris ko select kar rahe hain
    const pupil = pupils[index];
    const iris = irises[index];

    // Iris ke bounding rectangle ki position aur size ko get kar rahe hain
    const irisRect = iris.getBoundingClientRect();

    // Iris ke center ka X aur Y coordinate calculate kar rahe hain
    const irisCenterX = irisRect.left + irisRect.width / 2;
    const irisCenterY = irisRect.top + irisRect.height / 2;

    // Mouse ke current position se iris ke center tak ki distance aur direction calculate kar rahe hain
    const deltaX = event.clientX - irisCenterX; // Horizontal distance
    const deltaY = event.clientY - irisCenterY; // Vertical distance

    // Angle ko atan2 ke through calculate kar rahe hain, jisse direction milti hai
    const angle = Math.atan2(deltaY, deltaX);

    // Distance ko calculate kar rahe hain, lekin ek limit set kar rahe hain, max 20 pixels tak hi move karne dena hai
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 20);

    // Iris ko move karne ke liye X aur Y direction mein movement calculate kar rahe hain
    const irisMoveX = Math.cos(angle) * distance;
    const irisMoveY = Math.sin(angle) * distance;

    // Iris ko move karne ke liye CSS transform apply kar rahe hain
    iris.style.transform = `translate(${irisMoveX}px, ${irisMoveY}px)`;

    // Iris ka radius calculate kar rahe hain
    const irisRadius = irisRect.width / 2;

    // Pupil ko bhi distance limit ke andar move karne ke liye calculate kar rahe hain (radius - 5)
    const pupilDistance = Math.min(distance, irisRadius - 5);

    // Pupil ke liye X aur Y movement calculate kar rahe hain, lekin thoda aur distance kam kar rahe hain (pupil ko iris ke center se thoda door rakhte hain)
    const pupilMoveX = Math.cos(angle) * (pupilDistance - 13);
    const pupilMoveY = Math.sin(angle) * (pupilDistance - 12);

    // Pupil ko move karne ke liye CSS transform apply kar rahe hain
    pupil.style.transform = `translate(${pupilMoveX}px, ${pupilMoveY}px)`;
  });
});
