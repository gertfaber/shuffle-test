import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const array = ['a', 'b', 'c', 'd', 'e'];


const shuffleArray = (arr) => {
  let shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ShuffleChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize count storage
    const positions = array.reduce((acc, letter) => {
      acc[letter] = Array(array.length).fill(0);
      return acc;
    }, {});

    // Shuffle 1000 times    
    const numShuffles = 1000000    ;
    for (let i = 0; i < numShuffles; i++) {
      const shuffled = shuffleArray(array);
      shuffled.forEach((letter, index) => {
        positions[letter][index]++;
      });
    }

    // Format data for chart
    const labels = array.map((_, i) => `Position ${i + 1}`);
    const datasets = array.map((letter) => ({
      label: letter,
      data: positions[letter],
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    }));

    setData({
      labels,
      datasets,
    });
  }, []);

  return (
    <div>
      <h2>Shuffle Test Results</h2>
      {data && <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Letter Positions After 1 000 000 Shuffles' } } }} />}
    </div>
  );
};

export default ShuffleChart;
