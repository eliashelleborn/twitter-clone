import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: block;
  position: relative;
  margin-left: 56px;
`;
const InputTextArea = styled.textarea`
  width: 100%;
  height: 36px;
  resize: none;
  background: #fff;
  border: 1px solid #C6E4F7;
  padding: 8px;
  padding-right: 35px;
  font-size: 14px;
  color: #14171a;
  outline: 0;
  line-height: 20px;
  border-radius: 8px;
  &::placeholder {
    color: #1B95E0;
  }
`;
const ImageIcon = styled.button`
  position: absolute;
  font-size: 18px;
  color: #1B95E0;
  top: 9px;
  right: 15px;
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  cursor: pointer;
`;

const Input = () => (
  <InputWrapper>
    <InputTextArea placeholder="What's happening?" />
    <ImageIcon>
      <i className="far fa-images" />
    </ImageIcon>
  </InputWrapper>
);

export default Input;
