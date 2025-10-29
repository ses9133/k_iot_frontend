var count = 0;
function updateDisplay() {
    var countElement = document.getElementById('countValue');
    if (countElement) {
        countElement.textContent = count.toString();
    }
}
function increment() {
    count++;
    updateDisplay();
}
function decrement() {
    count--;
    updateDisplay();
}
document.addEventListener('DOMContentLoaded', function () {
    var incrementBtn = document.getElementById('incrementBtn');
    var decrementBtn = document.getElementById('decrementBtn');
    if (incrementBtn)
        incrementBtn.addEventListener('click', increment);
    if (decrementBtn)
        decrementBtn.addEventListener('click', decrement);
});
