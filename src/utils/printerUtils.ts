import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import ThermalPrinter from 'react-native-thermal-printer';

import configService from '../services/configService';
import { dateUtils, orderUtils } from './';

async function getPrinterMode(): Promise<'BLUETOOTH' | 'SERIAL'> {
  return (await configService.getConfig(configService.CONFIG_PRINTER_MODE)) || 'BLUETOOTH';
}

// when usb mode is selected, printer is shown as alaways available
export function useIsPrintingAvailable() {
  const [isPrintingAvailable, setIsPrintingAvailable] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        const printersCheck = async () => {
          const printerMode = await getPrinterMode();
          if (printerMode === 'BLUETOOTH') {
            const printers = await ThermalPrinter.getBluetoothDeviceList().catch(() => null);
            setIsPrintingAvailable((printers?.length || 0) > 0);
          } else {
            setIsPrintingAvailable(true);
          }
        };

        printersCheck();
      } catch (ex) {
        // ignore error for now.
      }
    }
  }, []);
  return isPrintingAvailable;
}

export async function printOrder(order: App.Api.Order) {
  if (Platform.OS !== 'android') {
    // TODO: make printing available on ios
    Alert.alert('Printing is available only on android devices');
  }

  const clientStr = [order.attributes.customer_name, order.attributes.telephone]
    .filter(Boolean)
    .join('\n[L]');

  const deliveryAddress = order.attributes.formatted_address;
  const isDelivery = order.attributes.order_type === 'delivery';

  const deliveryStr = isDelivery ? ['[L]<b>Leveren naar :</b>\n', `[L]${deliveryAddress}\n`] : [];

  const clientNote = order.attributes.comment;

  const amounts = order.attributes.order_totals
    .map((item) => {
      return `[R]${item.title.toUpperCase()} :[R]${orderUtils.formatNumber(item.value)}\n`;
    })
    .join('');

  const qrCode = deliveryAddress
    ? `http://maps.google.com/?q=${encodeURIComponent(deliveryAddress)}`
    : undefined;

  const orderLinesStr = order.attributes.order_menus
    .map((item) => {
      const totalText = orderUtils.formatNumber(item.subtotal);
      const lineText = `[L]${item.quantity} x <b>${item.name}</b>[R]${totalText}\n`;
      const suppText = item.menu_options
        ?.map((supp) => {
          return `[L] + ${supp.quantity} x ${supp.order_option_name}\n`;
        })
        ?.join('');

      const note = item.comment ? `[L] Opm: ${item.comment}\n` : '';

      return `${lineText}${suppText}${note}`;
    })
    .join('');

  const orderText = [
    "[C]<font size='big'>EATONLINE</font>\n",
    '[C]==============================\n',
    '[L]\n',
    `[C]<b>Bestelling nr: ${order.id}</b>\n`,
    `[C]${dateUtils.formatDateTime(order.attributes.created_at)}\n`,
    '[L]\n',
    `[C]<b><font size="big">${
      order.attributes.order_type === 'collection' ? 'Afhaling' : 'Bezorging'
    }</font></b>\n`,
    `[C]<b><font size="big">Bevestigd voor: ${dateUtils.formattedTime(
      order.attributes.order_date_time
    )}</font></b>\n`,
    '[L]\n',
    '[L]<b>Klant :</b>\n',
    `[L]${clientStr}\n`,
    '[L]\n',
    `[L]<b>Opmerking:</b> ${clientNote}\n`,
    '[L]\n',
    ...deliveryStr,
    '[L]\n',
    '<b>Bestelling:</b>\n',

    orderLinesStr,
    '[C]--------------------------------\n',
    amounts,
    `\n[C]<b>${orderUtils.paymentCodeToText(order.attributes.payment)}</b>\n`,
    '[C]================================\n',
    '[L]\n',
    '[L]\n',
    qrCode ? '[C]Scannen en bezorgen\n' : '',
    qrCode ? `[C]<qrcode size='20'>${qrCode}</qrcode>\n` : '',
    '[C]www.eatonline.be\n',
    '[C]Dit is geen factuur\n',
  ].join('');

  try {
    const printerMode = await getPrinterMode();
    if (printerMode === 'BLUETOOTH') {
      await ThermalPrinter.printBluetooth({
        payload: orderText,
        printerNbrCharactersPerLine: 32,
        printerDpi: 198,
        printerWidthMM: 58,
      });
    } else {
      await ThermalPrinter.printUsb({ autoCut: true, openCashbox: false, payload: orderText });
    }
  } catch (err) {
    Alert.alert('Error printing', `${err}`);
    //error handling
  }
}
