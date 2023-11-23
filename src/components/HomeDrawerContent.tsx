import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { locationsApi } from '../api';
import { AppDispatch, RootState } from '../store';
import { Text } from '../ui';
import { OptionSwitch } from '../ui/elements/OptionSwitch';
import { dateUtils } from '../utils';

type TProps = DrawerContentComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type TState = {
  locationStatus?: App.Api.LocationStatusUpdate;
};
class HomeDrawerContentImplementation extends React.Component<TProps, TState> {
  state: TState = {};
  componentDidMount() {
    this.fetchLocationStatus();
  }

  fetchLocationStatus = async () => {
    const location = this.props.activeLocation;
    if (!location) return;

    const locationStatus = await locationsApi.getLocationStatus(location.id).catch(() => undefined);
    if (locationStatus) {
      this.setState({ locationStatus });
    }
  };

  componentDidUpdate(prevProps: TProps) {
    if (this.props.activeLocation?.id !== prevProps.activeLocation?.id) {
      this.fetchLocationStatus();
    }
  }

  onLocationPress = () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('LocationSelectScreen');
  };

  changeLocationStatus = async (type: string, value: boolean) => {
    const location = this.props.activeLocation;
    if (!location) return;
    const locationStatus = await locationsApi
      .changeLocationStatus(location.id, { [type]: value })
      .catch(() => undefined);
    if (locationStatus) {
      this.setState({ locationStatus });
    }
  };

  render() {
    const location = this.props.activeLocation;
    const { locationStatus } = this.state;
    const logo = location?.attributes.media?.[0]?.path;
    return (
      <SafeAreaView className="flex-1 bg-sky-700 pb-2">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.onLocationPress}
          className="flex-row items-center px-3 pt-3">
          {logo ? (
            <Image source={{ uri: logo }} className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
          )}
          <View className="flex-1">
            <Text weight="bold" className="text-white text-lg">
              {location?.attributes.location_name}
            </Text>
            <Text className="text-white ">{location?.attributes.location_city}</Text>
          </View>
        </TouchableOpacity>

        <View className="border-t border-sky-800 mt-2 py-2">
          <OptionSwitch
            title="DELIVERY"
            values={['Open', 'Closed']}
            textStyle="text-white"
            selectedIndex={locationStatus?.offer_delivery ? 0 : 1}
            onIndexChange={(idx) => {
              this.changeLocationStatus('offer_delivery', idx === 0);
            }}
          />

          <OptionSwitch
            title="TAKEAWAY"
            textStyle="text-white"
            values={['Open', 'Closed']}
            selectedIndex={locationStatus?.offer_collection ? 0 : 1}
            onIndexChange={(idx) => {
              this.changeLocationStatus('offer_collection', idx === 0);
            }}
          />
        </View>

        <View className=" py-2 my-4 flex-1">
          <DrawerButton
            title="Settings"
            icon="cog-outline"
            onPress={() => {
              this.props.navigation.navigate('SettingsScreen');
            }}
          />
          <DrawerButton
            title="Sales Report"
            icon="file-document-outline"
            onPress={() => {
              this.props.navigation.navigate('SalesReportScreen');
            }}
          />
        </View>

        <Text className="text-center text-white font-sans">
          version:{' '}
          {`${Application.nativeApplicationVersion} (${Application.nativeBuildVersion}) /  (${Updates.channel})`}
        </Text>
        {this.props.ordersLastCheckedAt ? (
          <Text className="text-white text-center text-xs">
            orders checked at:
            {dateUtils.formatDateTimeSec(new Date(this.props.ordersLastCheckedAt))}
          </Text>
        ) : undefined}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  activeLocation: state.auth.activeLocation,
  ordersLastCheckedAt: state.orders.newOrdersCheckedAt,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

export const HomeDrawerContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeDrawerContentImplementation);

const DrawerButton = ({
  onPress,
  icon,
  title,
}: {
  onPress: () => void;
  title: string;
  icon: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="px-4 py-3 flex-row items-center border-y border-sky-800">
      <MaterialCommunityIcons name={icon as any} size={24} color="white" />
      <Text className="text-white ml-4 flex-1">{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color="#ccc" />
    </TouchableOpacity>
  );
};
