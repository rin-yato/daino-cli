import chalkAnimation from "chalk-animation";

export type AnimationType = keyof typeof chalkAnimation;

export default function animate(
  text: string,
  type: AnimationType = "rainbow",
  speed?: number
) {
  const animation = chalkAnimation[type](text, speed);
  animation.start();
  return animation;
}
