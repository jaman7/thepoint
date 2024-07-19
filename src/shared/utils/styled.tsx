import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ isActive: boolean }>`
  td {
    color: ${({ isActive }) => (isActive ? 'red !important' : 'black !important')};
  }
`;
