import React, { Component } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { StockData } from './StockData';
import watchListService from '../services/WatchListService';

interface AddToWatchListDialogProps {
  visible: boolean;
  stock: StockData;
  onSuccess?: () => void;
  onClose: () => void;
}

class AddToWatchListDialog extends Component<AddToWatchListDialogProps> {
  handleConfirm = async () => {
    const { stock, onSuccess, onClose } = this.props;
    const success = await watchListService.addToWatchList(stock);
    if (success && onSuccess) {
      onSuccess();
    }
    onClose();
  };

  render() {
    const { visible, stock, onClose } = this.props;

    return (
      <ConfirmDialog
        visible={visible}
        title="加入自選"
        message={`是否將 ${stock.name}(${stock.symbol}) 加入自選股？`}
        onConfirm={this.handleConfirm}
        onCancel={onClose}
      />
    );
  }
}

export default AddToWatchListDialog;
