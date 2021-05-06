function sum(a: number, b: number) {
  return a + b;
}

document.querySelector('#submit').addEventListener('click', () => {
  const val1 = (document.querySelector('#input1') as HTMLInputElement).value;
  const val2 = (document.querySelector('#input2') as HTMLInputElement).value;

  console.log(sum(val1, val2));
});

export {};
