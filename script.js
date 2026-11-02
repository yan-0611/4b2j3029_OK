let 今天 = new Date();
let 演唱會日期 = new Date("2026-11-01");
let 時間差 = 演唱會日期 - 今天;

document.getElementById("day").innerHTML =
    "距離演唱會還剩下" +
    Math.floor(時間差 / (1000 * 60 * 60 * 24)) +
    "天";

const today = new Date();
today.setHours(0, 0, 0, 0);

const performanceDate = new Date(2026, 7, 8);
const millisecondsPerDay = 1000 * 60 * 60 * 24;
const daysUntilPerformance = Math.ceil((performanceDate - today) / millisecondsPerDay);
const countdown = document.getElementById("倒數");

if (daysUntilPerformance > 0) {
    countdown.textContent = `距離高雄場還有 ${daysUntilPerformance} 天`;
} else if (daysUntilPerformance === 0) {
    countdown.textContent = "就是今天，現場見！";
} else {
    countdown.textContent = "2026 巡演，謝謝你來過";
}

const playButton = document.getElementById("播放按鈕");
const player = document.querySelector(".player");
const playerStatus = document.getElementById("播放狀態");
const playerTime = document.getElementById("播放時間");
let audioContext;
let oscillator;
let gain;
let timer;
let elapsed = 0;

playButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
        window.clearInterval(timer);
        player.classList.remove("is-playing");
        playButton.innerHTML = "<span>▶</span> 播放試聽";
        playerStatus.textContent = "點擊播放，聽見 Nighthall 的新聲音";
        return;
    }

    audioContext = audioContext || new AudioContext();
    oscillator = audioContext.createOscillator();
    gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 220;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, audioContext.currentTime + 0.4);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    player.classList.add("is-playing");
    playButton.innerHTML = "<span>Ⅱ</span> 暫停試聽";
    playerStatus.textContent = "正在播放〈潮汐之間〉試聽片段";
    timer = window.setInterval(() => {
        elapsed += 1;
        playerTime.textContent = `00:${String(elapsed % 60).padStart(2, "0")}`;
        oscillator.frequency.value = 220 + (elapsed % 4) * 55;
    }, 1000);
});
