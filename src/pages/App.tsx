import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { LoremIpsum } from "lorem-ipsum";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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

type CardType = {
  title: String;
  content: String;
};

const fakeCardData = new Array(30).fill(0).map((_, i) =>
  new Array(Math.ceil(Math.random() * 20) + 5).fill(0).map((__, j) => ({
    title: `Card Name ${i}-${j}`,
    content: fakeText.generateParagraphs(10),
  }))
);

function sortCards(cards: CardType[][]) {
  const sortedCards = cards.sort((a, b) => a.length - b.length);
  const leftCards = [];
  const rightCards = [];

  for (let i = 0; i < sortedCards.length; i += 1) {
    if (i % 2) leftCards.push(cards[i]);
    else rightCards.push(cards[i]);
  }

  return leftCards.concat(rightCards.reverse());
}

function Card(props: CardType) {
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
  const [fakeCards, _] = useState(() => sortCards(fakeCardData));

  return (
    <TransformWrapper minScale={0.5} centerOnInit>
      <TransformComponent
        contentClass={style.cards}
        wrapperClass={style.container}
      >
        {fakeCards.map((cards) => (
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
