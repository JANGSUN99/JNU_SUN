// 아이스크림 판매 내역 (transactions 배열)
const transactions = [
  { scoops: ["Chocolate", "Vanilla", "Mint Chip"], total: 5.5 },
  { scoops: ["Raspberry", "StrawBerry"], total: 2 },
  { scoops: ["Vanilla", "Vanilla"], total: 4 }
];

// 수익 계산
const total = transactions.reduce((acc, curr) => acc + curr.total, 0);
console.log(`You've made ${total} $ today`);  // You've made 11.5 $ today

// 각 맛의 판매량 계산
let flavorDistribution = transactions.reduce((acc, curr) => {
curr.scoops.forEach(scoop => {
  if (!acc[scoop]) {
    acc[scoop] = 0;
  }
  acc[scoop]++;
});
return acc;
}, {});

// 판매량 출력
console.log("판매된 아이스크림의 맛과 판매량:", flavorDistribution);

// 가장 많이 팔린 아이스크림 맛 찾기
let maxFlavor = "";
let maxCount = 0;

Object.keys(flavorDistribution).forEach(flavor => {
  if (flavorDistribution[flavor] > maxCount) {
      maxCount = flavorDistribution[flavor];
      maxFlavor = flavor;
  }
});

// 가장 많이 팔린 맛 출력
console.log(`가장 많이 팔린 아이스크림 맛: ${maxFlavor} (${maxCount}회 판매)`);
