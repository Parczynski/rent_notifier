import { Catalog } from '../classes/catalog'
import axios from 'axios'
import { MyHomeEstateResponse, MyHomeFactory } from './myhome.factory'
import { Estate } from '../classes/estate'

const ENDPOINT = 'https://www.myhome.ge/ru/s/'

const estateFactory = new MyHomeFactory()

interface IListResponse {
	Data: {
		Prs: Array<MyHomeEstateResponse>
	}
}

export class MyHomeCatalog extends Catalog {

	public name = 'myhome'
	
	constructor( protected params: Record<string,unknown> ) {
		super(  )
	}

	async * check( ): AsyncGenerator<Estate> {

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

			const estate = estateFactory.convert( data )

			yield estate

		}
		
	}
}