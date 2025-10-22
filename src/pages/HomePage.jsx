import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-xhssfYellow text-financeBlue font-comedy">
      <div className="text-3xl mb-4 font-bold">🎮 欢迎来到《王多鱼挑战》！</div>
      <div className="mb-6 text-lg">
        <div>规则很简单：</div>
        <ul className="list-disc ml-6 text-left">
          <li>✅ 你有 13 亿元</li>
          <li>✅ 必须在 30 天内花光</li>
          <li>✅ 每天最多花 1 亿元（避免作弊）</li>
          <li>✅ 花不完？任务失败！</li>
        </ul>
        <div className="mt-2">点击开始，成为西虹市新首富！</div>
      </div>
      <button className="px-6 py-2 rounded-full bg-financeBlue text-white font-bold text-xl shadow-lg hover:scale-105 transition" onClick={() => window.location.href = '/game'}>
        开始游戏
      </button>
    </div>
  );
}
