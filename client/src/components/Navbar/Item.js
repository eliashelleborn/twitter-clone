import styled from 'styled-components';


const Item = styled.div.attrs({
  flex: props => props.flex || '0',
  marginright: props => props.marginright || '0',
})`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 99;
  margin-right: ${props => props.marginright};
  flex: ${props => props.flex};
`;

export default Item;
