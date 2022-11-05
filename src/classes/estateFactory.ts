import { Estate } from './estate'

interface IEstateProps {
	address: string
	id: string
	phone: string
	images: string[]
	description: string
	link: string
	price: number,
	floor: number,
	bedrooms: number,
	rooms: number,
	area: number,
	date: Date
}

export class EstateFactory {
	create( props: IEstateProps ) {
		const instance = new Estate()
		instance.address = props.address
		instance.description = props.description
		instance.id = props.id
		instance.phone = props.phone
		instance.images = props.images
		instance.link = props.link
		instance.price = props.price
		instance.floor = props.floor
		instance.rooms = props.rooms
		instance.bedrooms = props.bedrooms
		instance.area = props.area
		instance.date = props.date

		return instance
	}
}