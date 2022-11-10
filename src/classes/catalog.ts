import { Estate } from './estate'

export abstract class Catalog {
	public name = 'abstract'
	
	abstract check( ): AsyncGenerator<Estate>
}