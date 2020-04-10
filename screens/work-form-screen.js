import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Input, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RNCamera} from 'react-native-camera';
import Layout from './layout';
import WorkName from '../components/work-name';

class WorkFormScreen extends Component {
  state = {
    cameraView: false,
    capturedImage: false,
    imageStr: '',
  };

  cameraHandler = () => {
    return (
      <TouchableOpacity
        style={style.cameraBtn}
        onPress={() => this.setState({cameraView: true})}>
        <Text style={style.lableText}>Image: </Text>
        <Icon name="photo-camera" size={30} />
      </TouchableOpacity>
    );
  };

  imageViewer = () => {
    if (this.props.state.formErrors.image !== '') {
      return (
        <View style={style.row2}>
          <Text style={style.errorMessage}>
            {this.props.state.formErrors.image}
          </Text>
        </View>
      );
    }
    if (this.props.state.imageData.hasOwnProperty('uri')) {
      return (
        <View>
          <Image
            source={{uri: this.props.state.imageData.uri, isStatic: true}}
            style={style.capturedImage}
          />
        </View>
      );
    }
  };

  takePic = async () => {
    if (this.camera) {
      const options = {quality: 0.1, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        cameraView: false,
      });
      this.props.setImageData(data);
    }
  };

  cameraView = () => {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={style.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        base64={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
          style={style.captureView}
          onPress={() => this.takePic()}>
          <Image
            source={require('../images/camera-shutter.png')}
            style={style.capture}
          />
        </TouchableOpacity>
      </RNCamera>
    );
  };

  renderItemList = () => {
    if (this.props.items && this.props.items.length === 0) {
      return false;
    }
    return (
      <View style={style.row2}>
        <View style={style.lable}>
          <Text style={style.lableText}>Changed Items:</Text>
          {this.getSelectedItemCount()}
        </View>
        <ScrollView style={style.multiselect}>
          {this.props.items &&
            this.props.items.map(item => {
              return (
                <CheckBox
                  key={item.ItemId}
                  title={item.Name}
                  checked={this.props.state.selectedItems.includes(item.ItemId)}
                  containerStyle={style.checkBoxStyle}
                  textStyle={style.checkBoxText}
                  onPress={() => this.props.setItem(item.ItemId)}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  };

  renderAssociatedUsers = () => {
    if (this.props.ausers && this.props.ausers.length === 0) {
      return false;
    }
    return (
      <View style={style.row2}>
        <View style={style.lable}>
          <Text style={style.lableText}>Associated Users: </Text>
          {this.getSelectedUsersCount()}
        </View>
        <ScrollView style={style.multiselect}>
          {this.props.ausers &&
            this.props.ausers.map(user => {
              return (
                <CheckBox
                  key={user.Sno}
                  title={user.Name}
                  checked={this.props.state.associatedUsers.includes(user.Sno)}
                  containerStyle={style.checkBoxStyle}
                  textStyle={style.checkBoxText}
                  onPress={() => this.props.setAssociateUser(user.Sno)}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  };

  getSelectedItemCount = () => {
    if (this.props.state.selectedItems.length > 0) {
      return <Text>{this.props.state.selectedItems.length} selected</Text>;
    }
  };

  getSelectedUsersCount = () => {
    if (this.props.state.associatedUsers.length > 0) {
      return <Text>{this.props.state.associatedUsers.length} selected</Text>;
    }
  };

  render() {
    if (this.state.cameraView === true) {
      return this.cameraView();
    }
    return (
      <Layout scroll={true}>
        <View style={style.screen}>
          <WorkName />
          <Input
            multiline={true}
            numberOfLines={5}
            placeholder="Type narration here..."
            onChangeText={value => this.props.setNarration(value)}
            errorMessage={this.props.state.formErrors.narration}
          />
          <View style={style.cameraContainer}>
            {this.cameraHandler()}
            {this.imageViewer()}
          </View>
          {this.renderItemList()}
          {this.renderAssociatedUsers()}
          <View>
            <CheckBox
              title={this.props.state.workStatus === true ? 'Close' : 'Open'}
              checked={this.props.state.workStatus}
              containerStyle={style.checkBoxStyle}
              textStyle={style.checkBoxText}
              onPress={() => this.props.setWorkStatus()}
            />
          </View>
          <View style={style.btnRow}>
            <TouchableOpacity
              style={style.btnStyle}
              onPress={() => this.props.handleSaveButton()}>
              <Text style={style.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    height: 150,
    padding: 10,
    justifyContent: 'space-around',
  },
  btnRow: {
    height: 100,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnStyle: {
    width: '100%',
    backgroundColor: '#2E1590',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  preview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  captureView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 60,
  },
  cameraContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  cameraBtn: {
    width: '30%',
    height: 50,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  capturedImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  multiselect: {
    height: 120,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingRight: 5,
    paddingTop: 5,
  },
  checkBoxStyle: {
    width: '95%',
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
  },
  checkBoxText: {
    color: '#000',
  },
  row2: {
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  lable: {
    flexDirection: 'row',
  },
  lableText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 5,
  },
});

export default WorkFormScreen;
