import { Catalog } from './catalog'
import { Handler } from './handler'

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