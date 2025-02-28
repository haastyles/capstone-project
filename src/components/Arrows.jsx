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
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

    return (
        <Arrow
            type="button"
            disabled={isFirstItemVisible}
            onClick={() => scrollPrev()}
            className="left"
        ><FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
    );
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
        <Arrow
            type="button"
            disabled={isLastItemVisible}
            onClick={() => scrollNext()}
            className="right"
        ><FontAwesomeIcon icon={faArrowRight}/>
        </Arrow>
    );
}