import { Estate } from './estate'

export abstract class EstateStorage {
	abstract get( catalog: string, id: string ): Promise<Estate|false>

	abstract set( catalog: string, id: string, estate: Estate ): Promise<Estate>
}