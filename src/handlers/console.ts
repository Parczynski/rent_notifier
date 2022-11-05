import { Estate } from '../classes/estate'
import { Handler } from '../classes/handler'

export class ConsoleHandler extends Handler {
	async handle( estate: Estate ): Promise<void> {
		console.log( estate )
	}
}