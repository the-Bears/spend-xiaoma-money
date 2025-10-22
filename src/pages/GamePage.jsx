import React, { useState, useEffect } from 'react';
import projects from '../data/projects.json';
import events from '../data/events.json';

const TOTAL_MONEY = 1300000000;
const MAX_DAY = 30;
const MAX_PER_DAY = 100000000;

function formatMoney(num) {
  return num.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 });
}

export default function GamePage() {
  const [day, setDay] = useState(1);
  const [moneyLeft, setMoneyLeft] = useState(TOTAL_MONEY);
  const [spent, setSpent] = useState(0);
  const [dailySpent, setDailySpent] = useState(0);
  const [eventMsg, setEventMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [eggMsg, setEggMsg] = useState('');

  useEffect(() => {
    setProgress(spent / TOTAL_MONEY);
    // 彩蛋
    if (spent > 1000000000) setEggMsg('马化腾开始紧张了！');
    else if (spent > 500000000) setEggMsg('你已进入富豪圈！');
    else setEggMsg('');
  }, [spent]);

  function handleBuy(amount, desc) {
    if (dailySpent + amount > MAX_PER_DAY) {
      alert('每天最多花 1 亿元！');
      return;
    }
    if (moneyLeft < amount) {
      alert('余额不足！');
      return;
    }
    setMoneyLeft(moneyLeft - amount);
    setSpent(spent + amount);
    setDailySpent(dailySpent + amount);
  }

  function nextDay() {
    setDay(day + 1);
    setDailySpent(0);
    // 随机事件
    if (Math.random() < 0.3) {
      const event = events[Math.floor(Math.random() * events.length)];
      setEventMsg(event.desc);
      if (event.effect.money) {
        setMoneyLeft(moneyLeft + event.effect.money);
      }
      if (event.effect.priceMultiplier) {
        // 这里可以扩展项目价格变动
      }
    } else {
      setEventMsg('');
    }
  }

  if (day > MAX_DAY || moneyLeft <= 0) {
    window.location.href = '/ending';
    return null;
  }

  return (
    <div className="min-h-screen bg-xhssfYellow text-financeBlue font-comedy flex flex-col items-center p-4">
      <div className="text-xl font-bold mb-2">📅 剩余 {MAX_DAY - day + 1} 天</div>
      <div className="mb-2">💰 当前余额：{formatMoney(moneyLeft)} | 已花：{formatMoney(spent)} | 日均消费：{formatMoney(spent / day)}</div>
      <div className="w-full max-w-xl mb-4">
        <div className="bg-gray-200 rounded-full h-6">
          <div className="bg-financeBlue h-6 rounded-full" style={{ width: `${progress * 100}%` }}></div>
        </div>
        <div className="text-right text-sm mt-1">进度：{(progress * 100).toFixed(1)}%</div>
      </div>
      <div className="mb-2 text-lg">{eggMsg}</div>
      <div className="mb-2 text-red-600">{eventMsg}</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {projects.map((p, idx) => (
          <button key={idx} className="bg-white shadow rounded-lg p-4 flex flex-col items-center hover:scale-105 transition" onClick={() => handleBuy(p.amount, p.desc)}>
            <span className="text-3xl mb-2">{p.icon}</span>
            <span className="font-bold">{p.name}</span>
            <span className="text-sm text-gray-500">{p.desc}</span>
            <span className="mt-2 text-financeBlue">{formatMoney(p.amount)}</span>
          </button>
        ))}
      </div>
      <button className="px-6 py-2 rounded-full bg-financeBlue text-white font-bold text-xl shadow-lg hover:scale-105 transition" onClick={nextDay}>
        进入下一天
      </button>
    </div>
  );
}
