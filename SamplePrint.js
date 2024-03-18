import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';

const printreciept = async value => {
  setTimeout(() => alert('Print Data ' + value), 1000);
  try {
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);
    await BluetoothEscposPrinter.printText(value, {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    });
  } catch (e) {
    console.log(e.message || 'ERROR');
  }
};

const SamplePrint = () => {
  const [value, setValue] = useState('');
  const handlePrint = () => {
    printreciept(value);
  };
  return (
    <View>
      <View style={styles.Header}>
        <Image
          source={require('./Images/BluetoothLogo.png')}
          style={styles.image}
        />
        <Text style={styles.HeaderTxt}>Bluetooth Printer</Text>
      </View>
      <TextInput
        multiline
        numberOfLines={5}
        placeholder="Enter the Text To Print"
        style={styles.inputTxt}
        value={value}
        onChangeText={setValue}
      />

      <View
        style={{
          backgroundColor: '#0D98D4',
          marginLeft: 120,
          marginTop: 10,
          padding: 10,
          width: 120,
          borderRadius: 8,
        }}>
        <TouchableOpacity
          onPress={handlePrint}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  Header: {
    height: 150,
    backgroundColor: '#1c0b9c',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  HeaderTxt: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputTxt: {
    borderWidth: 2,
    margin: 15,
    padding: 2,
    borderRadius: 30,
  },
  image: {
    height: 80,
    width: 80,
  },
  btn: {},
});
