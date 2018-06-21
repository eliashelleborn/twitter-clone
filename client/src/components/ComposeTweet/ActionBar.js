import styled from 'styled-components';

export const ActionBar = styled.div`
  display: flex;
  margin-left: 56px;
  margin-top: 5px;
`;

export const ActionsRight = styled.div`
  margin-left: auto;
`;

export const ActionsLeft = styled.div`
  display: flex;
`;

export const Action = styled.button`
  height: 100%;
  padding: 0 10px;
  color: #1B95E0;
  cursor: pointer;
  background: none;
  border: 1px solid #E8F4FB;
  border-radius: 3px;
  outline: 0;
  font-size: 15px;
  &:hover {
    border: 1px solid rgba(27,149,224,.5);
  }
  &:active {
    background-color: rgba(27,149,224,.05);
  }
  i {
    font-size: 18px;
  }
`;
