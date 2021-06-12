import { mouseClick } from 'services/audioService';
import React, { FunctionComponent, SVGProps } from 'react';
import { useAnimation } from './SlidingButton.gsap';
import './SlidingButton.scss';

// example: import { ReactComponent } from './icon.svg'
export type ReactSVG = FunctionComponent<
  SVGProps<SVGSVGElement> & { title?: string | undefined }
>;

export type SlideVariant =
  // hides the text completely on hover
  | 'normal'
  // slightly moves the text to the left
  | 'parallax';

interface Props {
  text: string;
  Icon: ReactSVG;
  variant: SlideVariant;
  onClick(): void;
  backgroundColor?: string;
}

// defaults to only showing the text
// reveals an icon when hovered

export function SlidingButton({
  onClick,
  Icon,
  text,
  variant,
  backgroundColor
}: Props) {
  const { button, span, svg } = useAnimation(variant, backgroundColor);

  function handleClick() {
    mouseClick.play();
    onClick();
  }

  return (
    <div className="sliding-button">
      <button onClick={handleClick} ref={button}>
        <span className="text" ref={span}>
          {text}
        </span>
        <Icon className="icon" ref={svg} />
      </button>
    </div>
  );
}
