import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const SearchSkeleton = () => {
  return (
    <View className="flex-1">
      <View className=" flex-row items-center px-4 py-2 border-b border-b-grey">
        <ShimmerPlaceholder style={styles.image} />
        <View className="flex-1">
          <ShimmerPlaceholder style={styles.title} />
          <ShimmerPlaceholder style={styles.description} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#171717',
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: '#888',
  },
});

export default SearchSkeleton;
