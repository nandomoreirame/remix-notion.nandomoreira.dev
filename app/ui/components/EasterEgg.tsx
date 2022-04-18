import * as React from 'react';
import { HiddenEasterEgg } from 'react-hidden-easter-egg';
import { ConfettiCanvas } from 'react-raining-confetti';

export function EasterEgg(): React.ReactElement {
  const [isOpened, setOpened] = React.useState(true);
  return (
    <>
      {isOpened && (
        <HiddenEasterEgg code={['b', 'a', 't', 'm', 'a', 'n']}>
          <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={1000000} />
          <div className="easteregg__modal" onClick={() => setOpened(false)}>
            <iframe
              width="90%"
              height="515"
              src="https://www.youtube.com/embed/jJ5l5ls0hP4?controls=0&autoplay=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              allowfullscreen
              playing={true}
            />
          </div>
        </HiddenEasterEgg>
      )}
    </>
  );
}
