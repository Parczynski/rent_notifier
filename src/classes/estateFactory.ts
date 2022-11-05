import { Estate } from './estate'

interface IEstateProps {
	address: string
	title: string
	phone: string
	images: string[]
	description: string
}

export class EstateFactory {
	create( { address, title, phone, images, description }: IEstateProps ) {
		const instance = new Estate()
		instance.address = address
		instance.description = description
		instance.title = title
		instance.phone = phone
		instance.images = images
	}
}