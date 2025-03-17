import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';

// 先定義常數
const STOCK_TYPES = [
  '個股',
  'ETF',
  '槓桿ETF',
  'ETN',
  '公司債',
  '期貨',
  '其他',
] as const;

// 從常數推導出類型
export type StockType = typeof STOCK_TYPES[number];

// 定義介面
interface StockTypeFilterProps {
  selectedType: StockType;
  onTypeSelect: (type: StockType) => void;
}

interface StockTypeFilterState {
  modalVisible: boolean;
}

// 定義正則表達式映射
const STOCK_PATTERNS: Record<Exclude<StockType, '其他'>, RegExp> = {
  ETF: /^00\d{2,3}$/,
  個股: /^[1-9]\d{3}$/,
  槓桿ETF: /^\d{5}[LR]$/,
  ETN: /^\d{6}$/,
  公司債: /^\d{5}B$/,
  期貨: /^\d{5}U$/,
};

// 股票類型判斷函數
export const getStockType = (symbol: string): StockType => {
  for (const [type, pattern] of Object.entries(STOCK_PATTERNS)) {
    if (pattern.test(symbol)) {
      return type as StockType;
    }
  }
  return '其他';
};

class StockTypeFilter extends React.Component<StockTypeFilterProps, StockTypeFilterState> {
  constructor(props: StockTypeFilterProps) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  private setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  private handleTypeSelect = (type: StockType) => {
    this.props.onTypeSelect(type);
    this.setModalVisible(false);
  };

  private renderTypeItem = ({ item }: { item: StockType }) => {
    const { selectedType } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.typeItem,
          selectedType === item && styles.selectedItem,
        ]}
        onPress={() => this.handleTypeSelect(item)}
      >
        <Text style={[
          styles.typeText,
          selectedType === item && styles.selectedText,
        ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { selectedType } = this.props;
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.buttonText}>{selectedType}</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => this.setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => this.setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={STOCK_TYPES}
                keyExtractor={(item) => item}
                renderItem={this.renderTypeItem}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 8,
    width: '80%',
    maxHeight: '80%',
  },
  typeItem: {
    padding: 12,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#333333',
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default StockTypeFilter; 