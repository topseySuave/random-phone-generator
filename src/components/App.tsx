import * as React from "react";
import numbersStore from '../storage/db.json';
import Button from "./Button";
import NumberLists from "./NumberLists";
import generatePhoneNumber from "./generatePhoneNumber";

interface SortingProps {
  findMax?: () => void;
  findMin?: () => void;
  sort?: (e: any) => void;
}

const SortSection = ({ findMax, findMin, sort }: SortingProps) => (
  <div>
    <div>
      <label>sort: </label>
      <select onChange={sort} data-testid="select">
        <option value="">select order</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
    <button onClick={findMax}>Max</button>
    <button onClick={findMin}>Min</button>
  </div>
);

const App = () => {
  const [allNumbers, setAllNumbers] = React.useState({
    order: "",
    numbers: []
  });
  const [amountOfNumbers, setAmountOfNumbers] = React.useState(0);

  const generateNumber = (amount = 25) => {
    let totalNumbers: any = [];
    const newAmount = amount < 5000 ? amount : 5000;
    for (let i = 0; i < newAmount; i++) {
      totalNumbers = [...totalNumbers, `0${generatePhoneNumber()}`];
    }
    numbersStore.numbers = totalNumbers;
    setAllNumbers({ numbers: totalNumbers, order: allNumbers.order });
  };

  const findMax = () => {
    let max = numbersStore.numbers[0];
    numbersStore.numbers.forEach((number) => {
      max = number > max ? number : max;
    })
    setAllNumbers({ numbers: [max], order: allNumbers.order });
  }

  const findMin = () => {
    let min = numbersStore.numbers[0];
    numbersStore.numbers.forEach((number) => {
      min = number < min ? number : min;
    })
    setAllNumbers({ numbers: [min], order: allNumbers.order });
  }

  const sort = ({ target: { value }} : any) => {
    let rearrangement = numbersStore.numbers;
    const newOrder = value || '';
    if (value === 'ascending') {
      rearrangement = numbersStore.numbers.sort((a, b) => a - b);
    }
    if (value === 'descending') {
      rearrangement = numbersStore.numbers.sort((a, b) => b - a);
    }
    setAllNumbers({ order: newOrder, numbers: rearrangement });
  }
  return (
    <div className="container">
      <h1>Phone Number Generator</h1>
      <div className="">
        <input
          name="generator"
          type="number"
          placeholder="input the amount of numbers you want to generate"
          onChange={e => setAmountOfNumbers(parseInt(e.target.value, 10))}
          data-testid="number-input"
        />
      </div>
      <Button
        placeholder="Generate Numbers"
        handleClick={() => generateNumber(amountOfNumbers || 20)}
      />
      {allNumbers.numbers.length > 0 && (
        <>
          <a
            href={`data:text/plain;charset=utf-8,${numbersStore.numbers}`}
            download="numbers.txt"
          >
            Download Numbers
          </a>
          <SortSection findMax={findMax} findMin={findMin} sort={sort} />
          <NumberLists numbers={allNumbers.numbers} />
        </>
      )}
    </div>
  );
};

export default App;
