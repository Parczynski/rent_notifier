import axios from 'axios'
import { Estate } from '../classes/estate'
import { Handler } from '../classes/handler'

export class Telegram extends Handler {

	protected chats: string[] = []

	constructor ( protected token: string ) {
		super()
	}

	addChat( chat: string ) {
		console.log( `Add new receiver for notifications in Telegram: ${chat}` )
		this.chats.push( chat )
	}

	prepareMessage( estate: Estate ): string {

		const image = ( estate.images.length > 0 )
			? `[image](${estate.images[0]})`
			: ''
		

		return `*№* ${estate.id}%0A` +
			`${estate.link}%0A` +
			`${estate.address}%0A` +
			`*Price:* ${estate.price}%0A` +
			`*Floor:* ${estate.floor}%0A` +
			`*Rooms:* ${estate.bedrooms} / ${estate.rooms}%0A` +
			`*Area:* ${estate.area}%0A` +
			`${image}`

	}

	async handle( estate: Estate ): Promise<void> {

		const message = this.prepareMessage( estate )

		for await ( const chat of this.chats ) {
			await axios.get( `https://api.telegram.org/bot${this.token}/sendMessage?parse_mode=Markdown&text=${message}&chat_id=${chat}` )
		}

	}


}