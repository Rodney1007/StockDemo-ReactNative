import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StockData } from './StockData.ts';
import FontUtils from '../utils/FontUtils.ts';
import PriceColorUtils from '../utils/PriceColorUtils';
import VolumeUtils from '../utils/VolumeUtils';
import AddToWatchListDialog from './AddToWatchListDialog';

interface StockItemProps {
  stock: StockData;
  onAddToWatchList?: () => void;
}

interface StockItemState {
  showDialog: boolean;
}

class StockItem extends Component<StockItemProps, StockItemState> {
  state = {
    showDialog: false,
  };

  handlePress = () => {
    this.setState({ showDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ showDialog: false });
  };

  render() {
    const { stock, onAddToWatchList } = this.props;
    const { showDialog } = this.state;
    const volumeInfo = VolumeUtils.formatVolume(stock.tradeVolume);

    return (
      <>
        <TouchableOpacity style={styles.stockItem} onPress={this.handlePress}>
          <View style={styles.container}>
            {/* 左側區塊：股票名稱和代號 */}
            <View style={styles.leftSection}>
              <Text style={[
                styles.name,
                { fontSize: FontUtils.calculateStockNameFontSize(stock.name) }
              ]}>
                {stock.name}
              </Text>
              <Text style={styles.symbol}>{stock.symbol}</Text>
            </View>

            {/* 收盤價和交易量區塊 */}
            <View style={styles.priceSection}>
              <Text style={[
                styles.closePrice,
                { color: PriceColorUtils.getPriceChangeColor(stock.price, stock.open) },
              ]}>
                {stock.price}
              </Text>
              <Text style={[
                styles.volume,
                volumeInfo.isShares && styles.shareVolume,
                styles.volumeText,
              ]}>
                {volumeInfo.text}
              </Text>
            </View>

            {/* 漲跌區塊 */}
            <View style={styles.changeSection}>
              <Text style={[
                styles.change,
                { color: PriceColorUtils.getPriceChangeColor(stock.price, stock.reference) },
              ]}>
                {stock.change}
              </Text>
              <Text style={[
                styles.changePercent,
                { color: PriceColorUtils.getPriceChangeColor(stock.price, stock.reference) },
              ]}>
                {stock.changePercent}%
              </Text>
            </View>

            {/* 合併的資訊區塊 */}
            <View style={styles.gridSection}>
              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>開：</Text>
                  <Text style={[
                    styles.value,
                    { color: PriceColorUtils.getPriceChangeColor(stock.open, stock.reference) },
                  ]}>
                    {stock.open}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>高：</Text>
                  <Text style={[
                    styles.value,
                    { color: PriceColorUtils.getPriceChangeColor(stock.high, stock.reference) },
                  ]}>
                    {stock.high}
                  </Text>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>參：</Text>
                  <Text style={styles.value}>{stock.reference}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.label}>低：</Text>
                  <Text style={[
                    styles.value,
                    { color: PriceColorUtils.getPriceChangeColor(stock.low, stock.reference) },
                  ]}>
                    {stock.low}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <AddToWatchListDialog
          visible={showDialog}
          stock={stock}
          onSuccess={onAddToWatchList}
          onClose={this.handleDialogClose}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  stockItem: {
    padding: 12,
    backgroundColor: '#1E1E1E',  // 深色背景
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',      // 深色邊框
    margin: 6,  // 從 4 增加到 6
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex:2.5,
    height: 44,  // 固定高度為名稱和代號的總高度
  },
  name: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 24,
  },
  symbol: {
    fontSize: 14,
    color: '#AAAAAA',           // 淺灰色文字
    lineHeight: 16,
  },
  priceSection: {
    flex: 1.5,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  closePrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  volume: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  volumeText: {
    marginTop: -2,  // 微調位置，使其更靠近收盤價
  },
  changeSection: {
    flex: 1.1,
    alignItems: 'flex-end',
  },
  change: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  changePercent: {
    fontSize: 14,
    fontWeight: '500',
  },
  gridSection: {
    flex: 3.2,
    marginLeft: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gridItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#AAAAAA',          // 淺灰色文字
  },
  value: {
    fontSize: 13,
    color: '#FFFFFF',          // 白色文字
    marginLeft: 4,
  },
  shareVolume: {
    color: '#888888',
  },
});

export default StockItem;
