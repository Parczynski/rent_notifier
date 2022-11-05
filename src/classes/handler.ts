import { Estate } from './estate'

export abstract class Handler {

	abstract handle( estate: Estate ): Promise<void>

}