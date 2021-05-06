/**
 * @param {number} a
 * @param {number} b
 */
function sum(a, b) {
  return a + b;
}

document.querySelector('#submit').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const el1 = document.querySelector('#input1');

  /** @type {HTMLInputElement} */
  const el2 = document.querySelector('#input2');

  const val1 = el1.value;
  const val2 = el2.value;

  console.log(sum(val1, val2));
});
