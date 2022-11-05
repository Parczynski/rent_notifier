import { Handler } from './handler'
import { EstateStorage } from './storage';

export abstract class Catalog {

	constructor( protected storage: EstateStorage ) {}

	abstract check( handler?: Handler ): Promise<void>
}