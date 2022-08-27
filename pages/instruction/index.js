import { useSpring, animated } from 'react-spring';

export default function InstructionPages() {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <button className="bg-red-500 hover:bg-red-300">鼠标放上来看看</button>
    </animated.div>
  );
}
