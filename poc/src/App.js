import "./App.css";
import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, set, onValue } from "firebase/database";

function App() {
  const [position, setPosition] = useState({ x: 400, y: 300 });
  const [otherPlayers, setOtherPlayers] = useState({});
  const speed = 5;

  // 캐릭터 움직임 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newPosition = { ...position };
      switch (e.key) {
        case "ArrowUp":
          newPosition.y -= speed;
          break;
        case "ArrowDown":
          newPosition.y += speed;
          break;
        case "ArrowLeft":
          newPosition.x -= speed;
          break;
        case "ArrowRight":
          newPosition.x += speed;
          break;
        default:
          return;
      }
      setPosition(newPosition);
      set(ref(database, "players/player1"), newPosition); // Firebase에 위치 업데이트
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  // Firebase에서 실시간 데이터 수신
  useEffect(() => {
    const playersRef = ref(database, "players");
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      setOtherPlayers(players || {});
    });
    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 구독 해제
  }, []); // 빈 배열로 설정하여 처음 한 번만 실행

  // 다른 플레이어들의 캐릭터 렌더링
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const spriteImage = new Image();
    spriteImage.src = "/sprite.png";

    spriteImage.onload = () => {
      const drawCharacters = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 자신의 캐릭터 그리기
        ctx.drawImage(
          spriteImage,
          0,
          0,
          64,
          64,
          position.x,
          position.y,
          64,
          64
        );

        // 다른 플레이어들 그리기
        for (let playerId in otherPlayers) {
          if (playerId !== "player1") {
            const playerPos = otherPlayers[playerId];
            ctx.drawImage(
              spriteImage,
              0,
              0,
              64,
              64,
              playerPos.x,
              playerPos.y,
              64,
              64
            );
          }
        }

        requestAnimationFrame(drawCharacters);
      };
      drawCharacters();
    };
  }, [position, otherPlayers]);

  return (
    <div className="App">
      <h1>React Firebase Gather Town</h1>
      <div></div>
      <canvas id="gameCanvas" width="800" height="600"></canvas>
    </div>
  );
}

export default App;
