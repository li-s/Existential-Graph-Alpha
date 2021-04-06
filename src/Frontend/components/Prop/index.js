import React, { useRef } from 'react';

import ContextMenu from './ContextMenu';
import './index.css'

const Prop = ({ children, menuItems }) => {
    const containerRef = useRef(null);

    return (
        <div className='prop' ref={containerRef}>
            {children}

            <ContextMenu
                parentRef={containerRef}
                items={menuItems}
            />
        </div>
    );
};

export default Prop;