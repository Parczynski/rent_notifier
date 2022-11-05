import { Estate } from '../classes/estate'
import { Handler } from '../classes/handler'

export class Telegram extends Handler {
	handle( estate: Estate ): Promise<void> {
		throw new Error( 'Method not implemented.' )
	}
}