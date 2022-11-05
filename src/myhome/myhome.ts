import { Catalog } from '../classes/catalog'
import { Handler } from '../classes/handler'

export class MyHomeCatalog extends Catalog {
	async check( handler?: Handler ): Promise<void> {
		console.log( 'myhome' )
	}
}