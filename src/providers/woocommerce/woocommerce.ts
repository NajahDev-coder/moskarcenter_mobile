import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WoocommerceProvider {

  WooCommerce: any;

  constructor() {
    this.WooCommerce = WC({
      url: 'https://moskarcenter.com',
      consumerKey: 'ck_dcd2ac836a21068e5c645566390a70400e2a27df',
      consumerSecret: 'cs_d65486c616067d1019eaf647667b10bfd1fe2225',
      wpAPI: true,
      queryStringAuth: true,
      verifySsl: true,
      version: 'wc/v2'
    });
  }

  init(){
    return this.WooCommerce
  }
}
