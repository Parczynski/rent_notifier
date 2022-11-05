import { Catalog } from './classes/catalog'
import { Handler } from './classes/handler'

export class Collection {

	constructor ( protected handler: Handler ) {}

	protected items: Catalog[] = []

	addCatalog( catalog: Catalog ) {
		this.items.push( catalog )
	}

	async init(): Promise<void> {
		this.items.map( catalog => catalog.check( ) )
	}

	async check(): Promise<void> {
		this.items.map( catalog => catalog.check( this.handler ) )
	}

}