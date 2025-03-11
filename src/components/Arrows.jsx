import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Arrow({
    children,
    disabled,
    onClick
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{opacity: disabled ? '0' : '1'}}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isFirstItemVisible = visibility.useIsVisible('first', true);
    const disabled = isFirstItemVisible;

    return (
        <Arrow
            type="button"
            disabled={disabled}
            onClick={() => { console.log({ isFirstItemVisible }); visibility.scrollPrev(); console.log({ isFirstItemVisible }); }}
            className="left"
        ><FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
    );
}

export function RightArrow() {
    const visibility = React.useContext(VisibilityContext);
    const isLastItemVisible = visibility.useIsVisible('last', true);

    const disabled = isLastItemVisible;

    return (
        <Arrow
            type="button"
            disabled={disabled}
            onClick={() => { console.log({ isLastItemVisible }); visibility.scrollNext(); console.log({ isLastItemVisible }); }}
            className="right"
        ><FontAwesomeIcon icon={faArrowRight}/>
        </Arrow>
    );
}