import { Estate } from '../classes/estate'
import { EstateStorage } from '../classes/storage'


export class InAppStorage extends EstateStorage {
	protected storage = new Map<string, Estate>

	private hash( catalog: string, id: string ): string {
		return `${catalog}-${id}`
	}

	async set( catalog: string, id: string, estate: Estate ): Promise<Estate> {

		console.log( estate )
		this.storage.set( this.hash( catalog, id ), estate )
		return estate

	}

	async get( catalog: string, id: string ): Promise<Estate|false> {

		return this.storage.get( this.hash( catalog, id ) ) || false

	}
}