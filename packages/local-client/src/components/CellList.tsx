/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AddCell } from './AddCell';
import { CellListItem } from './CellListItem';
import cellListStyles from './styles/cellListStyles';

export const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions();
  const orderedCellList = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((cellId: string) => {
      return data[cellId];
    });
  });

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();
  }, []);

  const renderedCells = orderedCellList.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell nextCellId={cell.id} />
    </React.Fragment>
  ));
  return (
    <div css={cellListStyles}>
      <AddCell forceVisible={orderedCellList.length === 0} nextCellId={null} />
      {renderedCells}
    </div>
  );
};
