import { Catalog } from '../classes/catalog'
import { Handler } from '../classes/handler'
import { EstateStorage } from '../classes/storage'
import axios from 'axios'
import { MyHomeEstateResponse, MyHomeFactory } from './myhome.factory'

const ENDPOINT = 'https://www.myhome.ge/ru/s/'

const estateFactory = new MyHomeFactory()

interface IListResponse {
	Data: {
		Prs: Array<MyHomeEstateResponse>
	}
}

export class MyHomeCatalog extends Catalog {
	constructor( storage: EstateStorage, protected params: Record<string,unknown> ) {
		super( storage )
	}

	async check( handler?: Handler ): Promise<void> {

		const queryString = {
			Keyword: '%D0%91%D0%B0%D1%82%D1%83%D0%BC%D0%B8',
			AdTypeID: '3',
			PrTypeID: '1',
			mapC: '41.6509502%2C41.6360085',
			GID: '8742159',
			FCurrencyID: '1',
			Ajax: '1',
			...this.params
		}

		const url = `${ENDPOINT}?${new URLSearchParams( queryString )}`

		const content = await axios.get<IListResponse>( url )

		for await ( const data of content.data.Data.Prs ) {

			const exists = await this.storage.get( 'myhome', data.product_id )

			if( exists !== false ) continue

			const estate = estateFactory.convert( data )

			this.storage.set( 'myhome', data.product_id, estate )

			if( typeof handler !== 'undefined' ) {
				handler.handle( estate )
			}

		}
		
	}
}