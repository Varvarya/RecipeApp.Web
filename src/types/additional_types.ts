import React from 'react';

export type OnClickEvent = React.MouseEvent<HTMLButtonElement> & {
    id: string;

}
