import { useEffect, useRef, useState } from "react";

export const useDrawPhone = (
  onDraw: ({ ctx, currentPoint, prevPoint }: DrawProps) => void
) => {
  const [touchStart, setTouchStart] = useState<boolean>(false);
  const canvasRefPhone = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);

  const onTouchStart = () => setTouchStart(true);

  const clearPhone = () => {
    const canvas = canvasRefPhone.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const touchHandler = (e: TouchEvent) => {
      if (!touchStart) return;

      const touch = e.touches[0];
      const currentPoint = computePointInCanvas(touch);

      const ctx = canvasRefPhone.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (touch: Touch) => {
      const canvas = canvasRefPhone.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      return { x, y };
    };

    const touchEnd = () => {
      setTouchStart(false);
      prevPoint.current = null;
    };

    const canvas = canvasRefPhone.current;
    canvas?.addEventListener("touchmove", touchHandler);
    window.addEventListener("touchend", touchEnd);

    return () => {
      canvas?.removeEventListener("touchmove", touchHandler);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [onDraw, touchStart]);

  return { canvasRefPhone, onTouchStart, clearPhone };
};
