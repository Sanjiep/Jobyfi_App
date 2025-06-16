import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '@/constants'

const TabButton = ({ name, activeTabs, onHandleSearch }) => (
  <TouchableOpacity style={styles.btn(activeTabs, name)} onPress={onHandleSearch}>
    <Text style={styles.btnText(name, activeTabs)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({tabs, activeTabs, setActiveTabs}) => {
  return (
    <View style={styles.container}>
      <FlatList 
      data={tabs}
      renderItem={({item}) => (
       <TabButton 
       name={item}
       activeTabs={activeTabs}
       onHandleSearch={() => setActiveTabs(item)}
       />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      // contentContainerStyle={{ columnGap: SIZES.xSmall/2 }}
      />
    </View>
  )
}

export default Tabs