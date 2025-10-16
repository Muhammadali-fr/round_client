"use client"

import Lottie, { LottieRefCurrentProps } from "lottie-react"
import { useRef, useEffect } from "react"

interface LottieAnimationProps {
  animationData: object
  loop?: boolean
  autoplay?: boolean
  speed?: number   // 👈 add speed control
  className?: string
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  speed = 0.8,  // default normal speed
  className = "w-64 h-64"
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    };
  }, [speed]);

  return (
    <div className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  )
}
