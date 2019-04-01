import randomNumber from 'random-number';

const generatePhoneNumber = () => (
  randomNumber({
    min: 100000000,
    max: 999999999,
    integer: true,
  })
);

export default generatePhoneNumber;
