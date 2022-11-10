import { Catalog } from './classes/catalog'
import { Handler } from './classes/handler'
import { InAppStorage } from './storage/inapp'

export class Collection {

	constructor ( protected handler: Handler, protected storage: InAppStorage ) {}

	protected items: Catalog[] = []

	addCatalog( catalog: Catalog ) {
		this.items.push( catalog )
	}

	async init(): Promise<void> {
		this.items.map( async catalog => {

			for await ( const estate of catalog.check(  ) ) {
				const exists = await this.storage.get( catalog.name, estate.id )
				if( exists !== false ) continue
				this.storage.set( 'myhome', estate.id, estate )

				if( process.env.TG_SEND_INIT_ESTATES === '1' && typeof this.handler !== 'undefined' ) {
					this.handler.handle( estate )
				}

			}

		} )
	}

	async check(): Promise<void> {
		this.items.map( async catalog => {

			for await ( const estate of catalog.check(  ) ) {
				const exists = await this.storage.get( catalog.name, estate.id )
				if( exists !== false ) continue
				this.storage.set( 'myhome', estate.id, estate )

				if( typeof this.handler !== 'undefined' ) {
					this.handler.handle( estate )
				}
			}

		} )
			
	}

}