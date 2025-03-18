import React, { useCallback } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { StockData } from './StockData';
import watchListService from '../services/WatchListService';

interface AddToWatchListDialogProps {
  visible: boolean;
  stock: StockData;
  onSuccess?: () => void;
  onClose: () => void;
}

const AddToWatchListDialog = ({
  visible,
  stock,
  onSuccess,
  onClose,
}: AddToWatchListDialogProps) => {
  const handleConfirm = useCallback(async () => {
    const success = await watchListService.addToWatchList(stock);
    if (success && onSuccess) {
      onSuccess();
    }
    onClose();
  }, [stock, onSuccess, onClose]);

  const dialogMessage = `是否將 ${stock.name}(${stock.symbol}) 加入自選股？`;

  return (
    <ConfirmDialog
      visible={visible}
      title="加入自選"
      message={dialogMessage}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
};

export default AddToWatchListDialog;
