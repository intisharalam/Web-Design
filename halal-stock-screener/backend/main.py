from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api_interaction import fetch_company_financial_data, fetch_news_data
from exceptions import CustomException

app = FastAPI()

class SymbolRequest(BaseModel):
    symbol: str

@app.post("/api/get_company_data")
async def get_company_data(request: SymbolRequest):
    symbol = request.symbol
    print(symbol)

    try:
        company_data = await fetch_company_financial_data(symbol)
    except CustomException as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Combine all data into a single response
    combined_data = {
        **company_data,
    }
    return {"message": "Company data fetched successfully", "data": combined_data}

@app.get("/api/get_newsfeed")
async def get_newsfeed():
    try:
        news_data = await fetch_news_data()
        return {"message": "News feed fetched successfully", "data": news_data}
    except CustomException as e:
        raise HTTPException(status_code=500, detail=str(e))
