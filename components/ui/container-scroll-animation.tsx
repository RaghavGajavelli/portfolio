"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "framer-motion";

const springConfig = { stiffness: 80, damping: 28, restDelta: 0.001 };

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.1"],
  });

  // Initialise from window immediately on client — prevents hydration snap
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") return window.innerWidth <= 768;
    return false;
  });

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mobileScale: [number, number] = [0.88, 1];
  const desktopScale: [number, number] = [1.04, 1];

  const rotateRaw  = useTransform(scrollYProgress, [0, 0.55], [14, 0]);
  const scaleRaw   = useTransform(scrollYProgress, [0, 0.55], isMobile ? mobileScale : desktopScale);
  const translateRaw = useTransform(scrollYProgress, [0, 0.55], [0, -24]);

  const rotate    = useSpring(rotateRaw,    springConfig);
  const scale     = useSpring(scaleRaw,     springConfig);
  const translate = useSpring(translateRaw, springConfig);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 py-20 md:px-20 md:py-28"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        willChange: "transform",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-8 mx-auto h-[26rem] md:h-[36rem] w-full border border-white/[0.08] p-2 md:p-3 bg-[#0e0e0e] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#111111]">
        {children}
      </div>
    </motion.div>
  );
};
