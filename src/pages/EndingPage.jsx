import React from 'react';
import endings from '../data/endings.json';

const TOTAL_MONEY = 1300000000;

function getEnding(moneyLeft) {
  if (moneyLeft === 0) return endings.find(e => e.id === 'success');
  return endings.find(e => e.id === 'fail');
}

export default function EndingPage() {
  // 简单模拟，实际可用 context 或 localStorage 传递 moneyLeft
  const params = new URLSearchParams(window.location.search);
  const moneyLeft = Number(params.get('moneyLeft')) || 0;
  const ending = getEnding(moneyLeft);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-xhssfYellow text-financeBlue font-comedy">
      <div className="text-4xl font-bold mb-4">🏆 {ending.title}</div>
      <div className="text-lg mb-6">{ending.desc.replace('{moneyLeft}', moneyLeft.toLocaleString())}</div>
      <button className="px-6 py-2 rounded-full bg-financeBlue text-white font-bold text-xl shadow-lg hover:scale-105 transition" onClick={() => window.location.href = '/'}>
        重新挑战
      </button>
    </div>
  );
}
