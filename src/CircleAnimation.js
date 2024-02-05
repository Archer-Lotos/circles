// CircleAnimation.js
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const CircleAnimation = () => {
  const [circles, setCircles] = useState([]);
  const squareSize = 510;

  const handleButtonClick = () => {
    if (circles.length >= 36) {
      // Remove the oldest circle
      setCircles((prevCircles) => prevCircles.slice(1));
    }

    const circleCount = circles.length;
    const circleDistance = 51;

    let newCircle = {
      id: 1,
      x: 1,
      y: 1,
      color: getRandomColor(),
    };


    // Update the coordinates of all circles
    setCircles((prevCircles) =>
    prevCircles.map((circle) => ({
        ...circle,
        id: circle.id + 1,
        ...(circle.id < 10 && { x: circleDistance * circle.id, y: 1 }),
        ...((circle.id > 9 && circle.id < 20) || (circle.id > 27 && circle.id < 36) && { x: 459 }),
        ...(circle.id > 9 && circle.id < 20 && { y: circleDistance * (circle.id - 9) }),
        ...(circle.id > 18 && circle.id < 30 && { x: 459 - (circleDistance * (circle.id - 18)), y: squareSize - circleDistance }),
        ...(circle.id > 27 && circle.id < 36 && { x: 1, y: 459 - (circleDistance * (circle.id - 27)) }),
      }))
    );    

    setCircles((prevCircles) => [...prevCircles, newCircle]);
    
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const bind = useGesture({
    onDrag: ({ down, offset: [mx, my] }) => {
      if (down) {

      }
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        {...bind()}
        style={{
          position: 'relative',
          width: `${squareSize}px`,
          height: `${squareSize}px`,
          border: '2px solid black',
        }}
      >
        {circles.map((circle, index) => (
          <animated.div
            key={index}
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: circle.color,
              transform: `translate(${circle.x}px, ${circle.y}px)`,
            }}
          >
          {circle.id}
          </animated.div>
        ))}
        <button
          onClick={handleButtonClick}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Добавить круг
        </button>
      </div>
    </div>
  );
};

export default CircleAnimation;
