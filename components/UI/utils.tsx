import * as React from 'react';
import Button from '../../components/UI/Button/Button';

/* Div to replace Markdown paragraphs */
export const CustomDiv: React.FunctionComponent = props => <div {...props} />
export const CVLink: React.FunctionComponent = (props?: any) => <span className={props.className}>{props.children}</span>
export const ProjectLink: React.FunctionComponent = (props?: any) => <Button onClick={e => props.handleClick(e, props.href)} caption={props.children} />;