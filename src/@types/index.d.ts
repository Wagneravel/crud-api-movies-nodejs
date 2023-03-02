declare global {
	namespace Express {
		interface Request {
			
			indexItem: number;
		}
	}
}
