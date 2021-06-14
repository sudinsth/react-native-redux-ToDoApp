import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Alert, 
  TouchableWithoutFeedback, 
  Keyboard } from 'react-native';

import { Header } from './src/component/header';
import { TodoItem } from './src/component/todoItem';
import { AddTodo } from './src/component/addTodo';


export default function App() {
  const [todo, setTodo] = useState([]);

  const pressHandler = (key) => {
    setTodo((prevTodo) => {
      return prevTodo.filter(todo => todo.key != key);
    })
  };

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodo((prevTodo) => {
        return [
          {text: text, key: Math.random().toString() },
          ...prevTodo
        ];
      });
    } else {
      Alert.alert('OOPS!', 'Todo must be over 3 chars long', [
        {text: 'OK', onPress: () => console.log('alert closed')}
      ]);
    }
    
  };
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={styles.container}>
        <StatusBar style='auto' />

        <Header />
        <View style={styles.content}>
        
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList 
              data={todo}
              renderItem={({item}) => (
                <TodoItem item={item} pressHandler={pressHandler}/>
              )}
            />
          </View>
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#edeceb',
  },
  list: {
    flex: 1,
    padding: 20,
  }
});
