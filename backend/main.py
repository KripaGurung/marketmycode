from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from routes import auth_router, router

app = FastAPI()


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
        },
    )


app.include_router(auth_router)
app.include_router(router)
