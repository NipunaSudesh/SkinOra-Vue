<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isMouseDown = ref(false);
let lastTime = 0;

const createHeart = (e) => {
  const now = Date.now();

  if (isMouseDown.value) return;
  if (now - lastTime < 40) return;
  lastTime = now;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
};

const handleMouseDown = () => {
  isMouseDown.value = true;
};

const handleMouseUp = () => {
  isMouseDown.value = false;
};

onMounted(() => {
  window.addEventListener("mousemove", createHeart);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", createHeart);
  window.removeEventListener("mousedown", handleMouseDown);
  window.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style>
.heart {
  position: fixed;
  width: 20px;
  height: 20px;
  background: red;
  clip-path: polygon(
    50% 0%,
    61% 10%,
    70% 25%,
    70% 40%,
    60% 60%,
    50% 75%,
    40% 60%,
    30% 40%,
    30% 25%,
    39% 10%
  );
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: pop 1s forwards;
}

@keyframes pop {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -150%) scale(1.5);
    opacity: 0;
  }
}
</style>
