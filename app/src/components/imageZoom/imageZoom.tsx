import * as React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from '@patternfly/react-core';
import { ExpandIcon, SearchPlusIcon, SearchMinusIcon } from '@patternfly/react-icons';
import './imageZoom.css';

const ImageZoom: React.FunctionComponent = props => {
  return (
    <div className="image-zoom">
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <TransformComponent>
              <div className="zoom-content-wrapper">{props.children}</div>
            </TransformComponent>
            <div className="zoom-controls">
              <Button variant="secondary" onClick={zoomIn}>
                <SearchPlusIcon />
              </Button>
              <Button variant="secondary" onClick={zoomOut}>
                <SearchMinusIcon />
              </Button>
              <Button variant="secondary" onClick={resetTransform}>
                <ExpandIcon />
              </Button>
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export { ImageZoom };
