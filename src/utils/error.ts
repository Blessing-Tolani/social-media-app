
interface ErrorProps {
  message: string;
  statusCode: number;
}


// class CustomError extends Error<ErrorProps> {
//     constructor({ statusCode, message }: ErrorProps) {
//       super(); 
//       this.statusCode = statusCode; 
//       this.message = message; 
//     }
//   }

const handleError = (err: any, req: any, res:any, next: any) => {
  let { statusCode, message } = err;

  if (!statusCode) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}
  
  module.exports = {
    handleError,
    // CustomError,
  };
