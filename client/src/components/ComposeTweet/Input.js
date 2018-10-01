import React from 'react';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: block;
  position: relative;
  margin-left: 56px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: ${props => (props.expanded ? '80px' : '36px')};
  resize: none;
  background: #fff;
  border: 1px solid;
  border-color: ${props => (props.expanded ? '#A3D4F2' : '#C6E4F7')};
  padding: 8px;
  padding-right: 50px;
  font-size: 14px;
  color: #14171a;
  outline: 0;
  line-height: 20px;
  border-radius: 8px;
  box-shadow: ${props => (props.expanded ? '0 0 0 1px #A3D4F2' : 'none')};
  &::placeholder {
    color: ${props => (props.expanded ? '#aab8c2' : '#1B95E0')};
  }
`;

export const InputCount = styled.div.attrs({
  countcolor: (props) => {
    if (props.textLength > props.maxChars) return '#e1245d';
    else if (props.textLength >= props.maxChars - 20 && props.textLength <= props.maxChars) { return '#ffad1f'; }
    return '#aab8c2';
  },
})`
  position: absolute;
  color: #aab8c2;
  font-size: 12px;
  right: 10px;
  bottom: 10px;
  span {
    color: ${props => props.countcolor};
  }
`;

export const InputImageIcon = styled.button`
  position: absolute;
  display: ${props => (props.expanded ? 'none' : 'block')};
  font-size: 18px;
  color: #1b95e0;
  top: 9px;
  right: 15px;
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  cursor: pointer;
`;
