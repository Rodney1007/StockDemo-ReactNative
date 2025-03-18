import React, { useCallback } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { StockData } from './StockData';
import watchListService from '../services/WatchListService';

interface RemoveFromWatchListDialogProps {
  visible: boolean;
  stock: StockData;
  onSuccess?: () => void;
  onClose: () => void;
}

const RemoveFromWatchListDialog = ({
  visible,
  stock,
  onSuccess,
  onClose,
}: RemoveFromWatchListDialogProps) => {
  const handleConfirm = useCallback(async () => {
    const success = await watchListService.removeFromWatchList(stock.symbol);
    if (success && onSuccess) {
      onSuccess();
    }
    onClose();
  }, [stock.symbol, onSuccess, onClose]);

  const dialogMessage = `是否將 ${stock.name}(${stock.symbol}) 從自選股移除？`;

  return (
    <ConfirmDialog
      visible={visible}
      title="移除自選"
      message={dialogMessage}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
};

export default RemoveFromWatchListDialog; 