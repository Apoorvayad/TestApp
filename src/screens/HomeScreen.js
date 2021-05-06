import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import JsonData from '../screens/JsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchText: '',
      UserData: [],
      isSelectedID: 0,
      isShow: false,
    };
  }

  componentDidMount() {
    this.storeJsonData();
    this.getJsonData();
  }

  ShowModal = () => {
    const {modalVisible, searchText, filteredData, UserData} = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({modalVisible: false});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.MainView}>
              <Pressable onPress={() => this.setState({modalVisible: false})}>
                <Image
                  style={styles.imgView}
                  source={require('../assets/cancel.png')}
                />
              </Pressable>

              <Image
                style={styles.imgView}
                source={require('../assets/comment.png')}
              />
            </View>

            <TextInput
              style={styles.searchBar}
              onChangeText={text => this.searchItems(text)}
              value={searchText}
              placeholder=" Type to Search..."
            />

            <FlatList
              contentContainerStyle={{marginVertical: 20}}
              showsVerticalScrollIndicator={false}
              data={searchText == '' ? UserData : filteredData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.id}
              ListEmptyComponent={this._listEmptyComponent}
            />
          </View>
        </View>
      </Modal>
    );
  };

  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.cityName}>No Data Found</Text>
      </View>
    );
  };

  SelectedItem = id => {
    this.setState({isSelectedID: id, isShow: !this.state.isShow});
  };

  renderItem = ({item, index}) => (
    <View>
      <Pressable
        onPress={() => this.SelectedItem(item.id)}
        key={item.id}
        style={styles.cardMain}>
      
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
          <View style ={{flexDirection:'row' }}>
            <Image
              style={styles.imgView1}
              source={item.image}
            />
            <Text style ={{alignSelf:'center',marginStart:10}}>{item.category}</Text>
          </View>

          <Image
            style={{width: 14, height: 14}}
            source={require('../assets/down.png')}
          />
        </View>
        
      </Pressable>

      {this.state.isSelectedID == item.id && this.state.isShow && (
        <View style={{marginStart: 10, marginVertical: 10}}>
          {item.subCategories.map((item, index) => {
            return (
              <View style={{padding: 5}}>
                <Text style={{marginVertical: 5}}>{item.subCategory}</Text>
                <View style={{height: 1, backgroundColor: '#DCDCDC'}} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  searchItems = text => {
    let newData;
    newData = this.state.UserData.filter(item => {
      const itemData = `${item.category.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });

    this.setState({
      filteredData: newData,
      searchText: text,
    });
  };

  storeJsonData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        JSON.stringify(JsonData.UserData),
      );
    } catch (error) {
      console.log(error);
    }
  };

  getJsonData = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@MySuperStore:key');
      if (myArray !== null) {
        console.log(JSON.parse(myArray));
        this.setState({UserData: JSON.parse(myArray)});
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.ShowModal()}

        <Pressable
          onPress={() => this.setState({modalVisible: true})}
          style={{
            backgroundColor: '#fb3b3b',
            borderRadius: 3,
          }}>
          <Text style={{color: '#FFFFFF', padding: 10, fontWeight: 'bold'}}>
            Load List
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(00,00,00,0.2)',
  },
  modalView: {
    width: '90%',
    // height: 132,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  imgView: {width: 25, height: 25},
  searchBar: {
    //height: 40,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  cardMain: {
    flex: 1,
    shadowColor: 'rgba(181, 181, 181, 0.1)',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: '#fbfbfb',
    borderWidth: 0.6,
    backgroundColor: '#ffffff',
    elevation: 5,
    marginVertical: 5,
    padding: 9,
    borderColor: 'gray',
  },
  MainView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
  },
  imgView1:{width: 40, height: 40, borderRadius: 40 / 2}
});
