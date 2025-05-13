const prizes = [
  { name: "A獎", weight: 30, video: "videos/a.mp4" },
  { name: "B獎", weight: 50, video: "videos/b.mp4" },
  { name: "C獎", weight: 20, video: "videos/c.mp4" }
];

const drawButton = document.getElementById("draw-button");
const lotteryContainer = document.getElementById("lottery-container");
const videoContainer = document.getElementById("video-container");
const prizeVideo = document.getElementById("prize-video");

function weightedRandom(prizes) {
  const totalWeight = prizes.reduce((acc, prize) => acc + prize.weight, 0);
  let rand = Math.random() * totalWeight;
  for (let prize of prizes) {
    if (rand < prize.weight) return prize;
    rand -= prize.weight;
  }
}

drawButton.addEventListener("click", () => {
  const selectedPrize = weightedRandom(prizes);
  if (!selectedPrize || !selectedPrize.video) {
    alert("無法載入獎項影片，請確認影片路徑是否正確！");
    return;
  }

  console.log("抽中獎項：", selectedPrize.name);
  console.log("播放影片：", selectedPrize.video);

  prizeVideo.src = selectedPrize.video;
  lotteryContainer.classList.add("hidden");
  videoContainer.classList.remove("hidden");
});

prizeVideo.addEventListener("ended", () => {
  videoContainer.addEventListener("click", goBackToDraw, { once: true });
});

function goBackToDraw() {
  prizeVideo.pause();
  prizeVideo.src = "";
  videoContainer.classList.add("hidden");
  lotteryContainer.classList.remove("hidden");
}
