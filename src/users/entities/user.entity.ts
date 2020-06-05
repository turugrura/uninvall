export interface UserEntity {
	_id: string
	username: string
	password: string
	firstName: string
	lastName: string
	role: Role
	isActive: boolean
}

export enum Role {
	admin = 'admin',
	user = 'user',
}
