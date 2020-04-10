import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';

const Overlay = props => {
  const [visible, setVisible] = useState(true);
  const closeOverlay = () => {
    props.closeOverlay();
    setVisible(false);
  };

  const loadContent = () => {
    if (props.type === 'text') {
      return <Text>{props.content}</Text>;
    }
    return (
      <Image
        source={{
          uri: props.content,
        }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
    );
  };

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.content}>{loadContent()}</View>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => closeOverlay()}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 200,
    // minHeight: 50,
    width: 250,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
  },
  closeContainer: {
    height: 30,
  },
  titleContainer: {
    height: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  closeBtn: {
    color: '#2E1590',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {width: 200, height: 120},
});

export default Overlay;
