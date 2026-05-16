export function getDeviceFingerprint(): string {
  if (typeof window === "undefined") return "";
  const cached = localStorage.getItem("augustus_device_fp");
  if (cached) return cached;

  let canvasFp = "";
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillStyle = "#f60";
      ctx.fillRect(0, 0, 100, 30);
      ctx.fillStyle = "#069";
      ctx.fillText("Abduraimov Erkinjon 🎓", 2, 15);
      canvasFp = canvas.toDataURL();
    }
  } catch {}

  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || "",
    canvasFp,
  ].join("|");

  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const fp = "fp_" + Math.abs(hash).toString(36) + "_" + raw.length.toString(36);
  localStorage.setItem("augustus_device_fp", fp);
  return fp;
}
