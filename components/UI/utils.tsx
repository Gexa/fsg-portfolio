import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Div to replace Markdown paragraphs */
export const CustomDiv: React.FunctionComponent = props => <div {...props} />
export const CVLink: React.FunctionComponent = (props?: any) => <span className={props.className}>{props.children} <FontAwesomeIcon icon={['fas', 'file-code']} /></span>