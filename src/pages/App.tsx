import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { LoremIpsum } from "lorem-ipsum";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import LazyLoad from "@senswap/react-lazyload";
import style from "./App.module.less";

const fakeText = new LoremIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1,
  },
  wordsPerSentence: {
    max: 10,
    min: 2,
  },
});

const fakeCardData = new Array(10).fill(0).map((_, i) =>
  new Array(Math.ceil(Math.random() * 10) + 5).fill(0).map((__, j) => ({
    title: `Card Name ${i}-${j}`,
    content: fakeText.generateParagraphs(10),
  }))
);
function Card(props: { title: String; content: String }) {
  const cardRef = useRef(null);
  const { title, content } = props;

  return (
    <div className={style.card} ref={cardRef}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{content}</div>
    </div>
  );
}

function Board() {
  return (
    <TransformWrapper minScale={0.5} centerOnInit>
      <TransformComponent
        contentClass={style.cards}
        wrapperClass={style.container}
      >
        {fakeCardData.map((cards) => (
          <div className={style.lane}>
            {cards.map((card) => (
              <Card title={card.title} content={card.content} />
            ))}
          </div>
        ))}
      </TransformComponent>
    </TransformWrapper>
  );
}

function App() {
  return (
    <div className={style.App}>
      <Board />
    </div>
  );
}

export default App;
