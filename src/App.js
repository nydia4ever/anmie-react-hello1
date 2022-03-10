import anime from "animejs/lib/anime.es.js";
import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

const App = () => {
  const prizeDOM = useRef(null);
  const resultDom = useRef(null);
  const [resultBg, setResultBg] = useState(false);
  const [timeLine, setTimeLine] = useState();

  useEffect(() => {
    const itemWidth = resultDom.current.clientWidth;
    const animationWith = prizeDOM.current.clientWidth;
    const Position2 = animationWith - itemWidth;
    const Position1 = Position2 / 2;

    const tl = anime.timeline({
      targets: prizeDOM.current?.children,
      autoplay: false,
      easing: "cubicBezier(0, 1, 0, 1)",
      loop: false
    });
    tl.add({
      targets: [resultDom.current],
      duration: 0,
      opacity: 0
    })
      .add({
        duration: 300,
        translateX: [0, Position1],
        opacity: [0, 1],
        scale: [0.5, 1]
      })
      .add({
        duration: 600,
        scale: [0.6, 1.2, 0.8, 1],
        opacity: 1,
        easing: "cubicBezier(0, 1, 0, 1)",
        complete: () => {
          setResultBg(true);
        }
      })
      .add({
        duration: 500,
        easing: "easeInOutSine",
        opacity: [1, 0]
      })
      .add({
        opacity: 1
      });
    tl && tl.play();
    setTimeLine(tl);
  }, []);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    timeLine && timeLine.seek(timeLine.duration * (zoom / 100));
  }, [zoom, timeLine]);

  return (
    <div class="container">
      <div ref={prizeDOM} className="content">
        <img
          className="item"
          src="https://turnover-yy.oss-cn-shanghai.aliyuncs.com/friend/friend_icon/staticIcon/app_version1/20145.png"
          ref={resultDom}
        />
      </div>
      {resultBg && <div className="resultBg"></div>}
      <div className="resultBgWhite"></div>
      <div className="resultBgYellow"></div>

      <input
        className="progress"
        step=".001"
        type="range"
        min="0"
        max="100"
        value={zoom}
        onChange={(event) => setZoom(event.target.value)}
      />
    </div>
  );
};

export default App;
