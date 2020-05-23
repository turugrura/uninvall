export default () => ({
	port: parseInt(process.env.APPLICATION_PORT, 10) || 3000,
	database: {
		host: process.env.MYSQL_HOST,
		port: parseInt(process.env.MYSQL_PORT, 10) || 5432,
	},
})
