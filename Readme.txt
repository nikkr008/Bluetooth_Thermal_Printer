add these code to node_modules\react-native-bluetooth-escpos-printer\android\src\main\java\RNBluetoothManagerModule.java
---------------------------------------

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;



add these permissions to adnroid > app > main > androidManifest.xml
-------------------------------------
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />