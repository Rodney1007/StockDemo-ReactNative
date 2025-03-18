import React from 'react';
import ConfirmDialog from './ConfirmDialog';
import { StockData } from './StockData';
import watchListService from '../services/WatchListService';

interface AddToWatchListDialogProps {
  visible: boolean;
  stock: StockData;
  onSuccess?: () => void;
  onClose: () => void;
}

const AddToWatchListDialog: React.FC<AddToWatchListDialogProps> = ({
  visible,
  stock,
  onSuccess,
  onClose,
}) => {
  const handleConfirm = async () => {
    const success = await watchListService.addToWatchList(stock);
    if (success && onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <ConfirmDialog
      visible={visible}
      title="加入自選"
      message={`是否將 ${stock.name}(${stock.symbol}) 加入自選股？`}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
};

export default AddToWatchListDialog; 