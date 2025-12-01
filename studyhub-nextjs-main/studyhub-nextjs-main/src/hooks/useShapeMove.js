import { TweenMax } from 'gsap';
import { useEffect } from 'react';

const useShapeMove = (ref) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const shapeMoveElement = ref.current;
      if (!shapeMoveElement) return;

      const wx = window.innerWidth;
      const wy = window.innerHeight;
      
      const x = e.pageX - shapeMoveElement.offsetLeft;
      const y = e.pageY - shapeMoveElement.offsetTop;
      
      const newx = x - wx / 2;
      const newy = y - wy / 2;
      
      const shapes = shapeMoveElement.querySelectorAll('.shape-image .shape');
      shapes.forEach((shape) => {
        let speed = shape.getAttribute('data-speed');
        if (shape.getAttribute('data-revert')) speed *= -1;
        TweenMax.to(shape, 1, { x: (1 - newx * speed), y: (1 - newy * speed) });
      });
    };

    const element = ref.current;
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);
};

export default useShapeMove;
