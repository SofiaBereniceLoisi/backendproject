const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 501
};

const errorsDictionary = {
    OK: 'Success',
    CREATED: 'Created successfully',
    BAD_REQUEST: 'Invalid request',
    UNAUTHORIZED: 'Unidentified user',
    FORBIDDEN: 'User without permissions',
    NOT_FOUND: 'Not found',
    CONFLICT: 'Conflictive request',
    INTERNAL_SERVER_ERROR:'Internal Server Error',
    SERVICE_UNAVAILABLE: 'Unavailable Service',
    EMPTY_CART: 'Cannot generate ticket: Cart is empty',
    INCORRECT_PASSWORD: 'Incorrect password',
    EMAIL_ALREADY_REGISTERED: 'Email already registered'
}

export class HttpResponse {
    Ok(res,data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            messagge: errorsDictionary.OK,
            data
        });
    }
    Created(res,data){
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            messagge: errorsDictionary.CREATED,
            data
        });
    }
    BadRequest(res,data){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            messagge: errorsDictionary.BAD_REQUEST,
            error: data
        });
    }
    Unauthorized(res,data){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            messagge: errorsDictionary.UNAUTHORIZED,
            error: data
        });
    }
    Forbidden(res,data){
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            messagge:  errorsDictionary.FORBIDDEN,
            error: data
        });
    }
    NotFound(res,data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            messagge: errorsDictionary.NOT_FOUND,
            error: data
        });
    }
    Conflict(res,data){
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            messagge: errorsDictionary.CONFLICT,
            error: data
        });
    }
    InternalServerError(res,data){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            messagge: errorsDictionary.INTERNAL_SERVER_ERROR,
            error: data
        });
    }
    ServiceUnavailable(res,data){
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
            status: HttpStatus.SERVICE_UNAVAILABLE,
            messagge: errorsDictionary.SERVICE_UNAVAILABLE,
            error: data
        });
    }

    EmptyCart(res, data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: errorsDictionary.EMPTY_CART,
            error: data
        });
    }

    IncorrectPassword(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: errorsDictionary.INCORRECT_PASSWORD,
            error: data
        });
    }

    EmailAlreadyRegistered(res, data) {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            message: errorsDictionary.EMAIL_ALREADY_REGISTERED,
            error: data
        });
    }
}