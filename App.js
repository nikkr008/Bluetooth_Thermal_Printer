import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

import SamplePrint from './SamplePrint';

export default App = () => {
  const [data, setData] = useState([]);
  const [foundData, setFoundData] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const enableBluetooth = () => {
    BluetoothManager.isBluetoothEnabled()
      .then(enabled => {
        if (enabled) {
          alert('Bluetooth enabled');
        } else {
          BluetoothManager.enableBluetooth()
            .then(() => {
              alert('Bluetooth turned on');
            })
            .catch(error => {
              alert(error);
            });
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const acessLocation = async () => {
    setIsScanning(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location access granted ');
        BluetoothManager.scanDevices()
          .then(resolve => {
            let objects = JSON.parse(resolve);
            const {paired, found} = objects;
            setData(paired);
            setFoundData(found);
          })
          .catch(reject => {
            alert(reject);
          })
          .finally(() => setIsScanning(false));
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
      setIsScanning(false);
    }
  };

  const ConnectBluetooth = async address => {
    await BluetoothManager.connect(address)
      .then(resolve => {
        console.log(resolve);
      })
      .catch(reject => {
        console.log('reject : ' + reject);
      });
  };

  const Item = ({name, address}) => (
    <TouchableOpacity onPress={() => ConnectBluetooth(address)}>
      <View
        style={{
          margin: 5,
          backgroundColor: 'blue',
          height: 50,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text style={{color: '#ffffff'}}>{name}</Text>
        <Text style={{color: '#ffffff'}}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
  const Item1 = ({name, address}) => (
    <TouchableOpacity onPress={() => ConnectBluetooth(address)}>
      <View
        style={{
          margin: 5,
          backgroundColor: 'blue',
          height: 50,
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text style={{color: '#ffffff'}}>{name}</Text>
        <Text style={{color: '#ffffff'}}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.mainContainer}>
      <SamplePrint />
      {isScanning && <ActivityIndicator size="large" color="#0000ff" />}
      {data.length > 0 && (
        <View style={styles.deviceContainer}>
          <Text style={{fontWeight: 'bold', marginLeft: 6, fontSize: 18}}>
            Paired Devices
          </Text>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Item name={item.name} address={item.address} />
            )}
            keyExtractor={item => item.address}
          />
        </View>
      )}
      {foundData.length > 0 && (
        <View style={styles.deviceContainer}>
          <Text style={{fontWeight: 'bold', marginLeft: 6, fontSize: 18}}>
            Found devices
          </Text>
          <FlatList
            data={foundData}
            renderItem={({item}) => (
              <Item1 name={item.name} address={item.address} />
            )}
            keyExtractor={item => item.address}
          />
        </View>
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={enableBluetooth}
          style={{backgroundColor: '#0D98D4', padding: 10, borderRadius: 8}}>
          <Text>Enable Bluetooth</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={acessLocation}
          style={{backgroundColor: '#0D98D4', padding: 10, borderRadius: 8}}>
          <Text>Scan Devices</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 40,
    gap: 30,
    padding: 10,
    borderRadius: 5,
  },
  deviceContainer: {
    height: 250,
  },
});
