import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  subDays,
} from 'date-fns';
import * as React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { salesReportApi } from '../api';
import { useAppSelector } from '../store';
import { Text } from '../ui';
import { dateUtils, orderUtils } from '../utils';

const SalesReportScreen = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [isFetching, setIsFetching] = React.useState(false);

  const [datePickerField, setDatePickerField] = React.useState<'start' | 'end'>();

  const locationId = useAppSelector((state) => state.auth.activeLocation?.id);

  const [data, setData] = React.useState<App.Api.SaleReportData>();
  React.useEffect(() => {
    fetchData(startDate, endDate);
  }, []);

  const fetchData = React.useCallback(
    (start: Date, end: Date) => {
      if (!locationId) return;
      setIsFetching(true);
      salesReportApi
        .getReports(start, end, locationId)
        .then((data) => {
          setData(data);
          setIsFetching(false);
        })
        .catch(() => {});
    },
    [isFetching, locationId]
  );

  return (
    <SafeAreaView className="flex-1">
      <>
        <View className="py-2 px-2 flex-row bg-gray-200 shadow-md">
          <View className=" border flex-1 bg-white border-gray-300 rounded flex-row justify-around">
            <TouchableOpacity
              onPress={() => {
                setDatePickerField('start');
              }}
              activeOpacity={0.6}
              className=" flex-1 items-center justify-center">
              <Text className="text-center">{dateUtils.formatDate(startDate)}</Text>
            </TouchableOpacity>
            <View className="border-l border-gray-300 my-2" />

            <TouchableOpacity
              onPress={() => {
                setDatePickerField('end');
              }}
              activeOpacity={0.6}
              className=" flex-1 items-center justify-center">
              <Text className="text-center">{dateUtils.formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={isFetching}
            activeOpacity={0.8}
            onPress={() => {
              fetchData(startDate, endDate);
            }}
            className="px-3 py-2 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
            <MaterialCommunityIcons name="text-box-search-outline" color="white" size={22} />
          </TouchableOpacity>
        </View>
        <View className="border-b border-gray-300 px-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 2, marginBottom: 4 }}>
            <TouchableOpacity
              onPress={() => {
                const today = new Date();
                setStartDate(today);
                setEndDate(today);
                fetchData(today, today);
              }}
              className="px-3 pt-2 pb-1 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
              <Text className="text-white">Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const yesterday = subDays(new Date(), 1);
                setStartDate(yesterday);
                setEndDate(yesterday);
                fetchData(yesterday, yesterday);
              }}
              className="px-3 pt-2 pb-1 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
              <Text className="text-white">Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // monday
                const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
                setStartDate(weekStart);
                setEndDate(weekEnd);
                fetchData(weekStart, weekEnd);
              }}
              className="px-3 pt-2 pb-1 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
              <Text className="text-white">This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const monthStart = startOfMonth(new Date()); // monday
                const monthEnd = endOfMonth(new Date());
                setStartDate(monthStart);
                setEndDate(monthEnd);
                fetchData(monthStart, monthEnd);
              }}
              className="px-3 pt-2 pb-1 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
              <Text className="text-white">This Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const quarterStart = startOfQuarter(new Date()); // monday
                const quarterEnd = endOfQuarter(new Date());
                setStartDate(quarterStart);
                setEndDate(quarterEnd);
                fetchData(quarterStart, quarterEnd);
              }}
              className="px-3 pt-2 pb-1 bg-slate-700 ml-2 my-0.5 rounded items-center justify-center">
              <Text className="text-white">This Quarter</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {!data || isFetching ? (
          <View className="flex-1 items-center mt-12">
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView className="flex-1 px-4 py-6 bg-gray-100">
            <Text className="text-center font-bold text-lg" weight="bold">
              Orders
            </Text>
            <Text className="text-center text-sm mb-6">
              {dateUtils.formatDate(data.orders_from)} - {dateUtils.formatDate(data.orders_to)}
            </Text>
            {data.count_by_order_type.map((type) => {
              return (
                <View key={type.order_type} className="flex-row">
                  <Text>{type.order_type}</Text>
                  <View className="flex-1 border-b border-gray-300 mx-4" />
                  <Text>{type.orders_count}</Text>
                </View>
              );
            })}

            {!!data.by_order_type?.length && (
              <Text className="text-center font-bold text-lg mt-4" weight="bold">
                Order Types
              </Text>
            )}
            {data.by_order_type.map((type) => {
              return (
                <View key={type.order_type} className="flex-row">
                  <Text>{type.order_type}</Text>
                  <View className="flex-1 border-b border-gray-300 mx-4" />
                  <Text>{orderUtils.formatAmount(type.total_amount, 'eur')}</Text>
                </View>
              );
            })}
            <Text className="text-center font-bold text-lg mt-8" weight="bold">
              Payment Methods
            </Text>
            {data.by_payment_methods.map((method) => {
              return (
                <View key={method.code} className="flex-row">
                  <Text>{method.name}</Text>
                  <View className="flex-1 border-b border-gray-300 mx-4" />
                  <Text>{orderUtils.formatAmount(method.total_amount, 'eur')}</Text>
                </View>
              );
            })}

            <View className="flex-row mt-2">
              <Text weight="bold" className="">
                Total
              </Text>
              <View className="flex-1 border-b border-gray-300 mx-4" />
              <Text weight="bold">{orderUtils.formatAmount(data.total_amount, 'eur')}</Text>
            </View>
          </ScrollView>
        )}
      </>

      {false && ( // print not yet available!
        <View className="pt-2 pb-4 bg-gray-300 px-4 shadow-lg">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // test
            }}
            className="px-3 py-2 bg-gray-800 rounded items-center justify-center flex-row">
            <MaterialCommunityIcons name="printer" size={18} color="white" />
            <Text className="text-white text-center ml-2 text-base">Print</Text>
          </TouchableOpacity>
        </View>
      )}

      <DateTimePickerModal
        isVisible={!!datePickerField}
        mode="date"
        date={datePickerField === 'end' ? endDate : startDate}
        onConfirm={(date) => {
          setDatePickerField(undefined);
          if (datePickerField === 'start') {
            setStartDate(date > endDate ? endDate : date);
          } else {
            setEndDate(date < startDate ? startDate : date);
          }
        }}
        onCancel={() => {
          setDatePickerField(undefined);
        }}
      />
    </SafeAreaView>
  );
};

export { SalesReportScreen };
