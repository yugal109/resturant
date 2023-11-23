import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, ListRenderItem, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { iOSColors, materialColors } from 'react-native-typography';
import { connect } from 'react-redux';

import { ScreenParamsList } from '../Navigation';
import { locationsApi } from '../api';
import loginService from '../services/loginService';
import { actions, AppDispatch, RootState } from '../store';
import { Text } from '../ui';

type TState = {
  selectedLocation?: App.Api.Location;
  isRefreshing: boolean;
};

type TProps = NativeStackScreenProps<ScreenParamsList, 'LocationSelectScreen'> &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

class LocationSelectImplementation extends React.Component<TProps, TState> {
  state: TState = {
    isRefreshing: false,
  };

  refreshLocations = async () => {
    if (this.state.isRefreshing) return;
    this.setState({ isRefreshing: true });
    const locations = await locationsApi.getLocations().catch(() => undefined);

    if (locations?.data.length) {
      this.props.updateLocations(locations);
    }
    this.setState({ isRefreshing: false });
  };

  selectAndContinue = async () => {
    // store the selected locationId
    if (!this.state.selectedLocation) return;
    await loginService.setActiveLocationId(this.state.selectedLocation.id);
    this.props.setActiveLocation(this.state.selectedLocation);
    this.props.navigation.navigate('Home');
  };

  renderItem: ListRenderItem<App.Api.Location> = ({ item }) => {
    const selectedLocationId = this.state.selectedLocation?.id;
    const activeLocationId = this.props.activeLocation?.id;
    const isActive = item.id === (selectedLocationId || activeLocationId);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.setState({ selectedLocation: item });
        }}
        className="px-4 py-4 bg-white flex-row items-center border-b border-gray-400">
        <View className="flex-1">
          <Text className="text-xl text-gray-800 flex-1" weight="semibold">
            {item.attributes.location_name}
          </Text>
          <Text className=" text-gray-800 flex-1" weight="regular">
            {item.attributes.location_city}
          </Text>
        </View>
        {isActive && (
          <MaterialIcons
            name="check-box"
            style={{ color: iOSColors.blue }}
            size={24}
            color={materialColors.blackPrimary}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView className="flex-1 bg-sky-700">
        <FlatList
          className="flex-1"
          data={this.props.locations?.data}
          keyExtractor={(i) => i.id}
          renderItem={this.renderItem}
          refreshing={this.state.isRefreshing}
          onRefresh={this.refreshLocations}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.selectAndContinue}
          disabled={!this.state.selectedLocation}
          className="mb-4 px-6 py-3 bg-blue-500 mx-4 disabled:bg-red-200">
          <Text className="text-white text-center" weight="semibold">
            Select & Continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  locations: state.auth.locations,
  activeLocation: state.auth.activeLocation,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setActiveLocation: (location: App.Api.Location) => {
    dispatch(actions.authActions.setActiveLocation(location));
    dispatch(actions.ordersActions.clearOrders());
  },
  updateLocations: (locations: App.Api.Pagination<App.Api.Location>) => {
    dispatch(actions.authActions.setLocations(locations));
  },
});

export const LocationSelectScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSelectImplementation);
